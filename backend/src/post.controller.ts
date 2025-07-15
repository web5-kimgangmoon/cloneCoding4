import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from './auth.guard';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Post_all_dto, Post_dto, Posts_dto } from './dto/post.dto';
import {
  Post_body,
  Post_create_query,
  Post_filer_query,
  Post_param_postId,
} from './class-validator/post.check';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(new AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  //swagger
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiCreatedResponse({
    description: '게시글을 생성합니다. 로그인 인증이 필요합니다.',
    schema: {
      type: 'object',
      properties: { message: { type: 'string', default: 'Post is created' } },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          minimum: 1,
          maximum: 3000,
          nullable: false,
        },
        img: {
          type: 'string',
          format: 'binary',
          nullable: true,
        },
      },
    },
  })
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
    required: true,
  })
  @ApiQuery({
    required: false,
    name: 'reply',
    description: 'reply하는 post일 경우, 덧붙일 post의 id를 입력하세요.',
    type: 'number',
  })
  async post(
    @Body()
    body: Post_body,
    @Session() session: { user_id: number },
    @Query() query?: Post_create_query,
  ) {
    await this.postService.create(
      body.content,
      // session.user_id,
      session.user_id, // 테스트
      body.img,
      query?.reply,
    );
    return 'Post is created!';
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  //swagger
  @ApiOkResponse({
    description: '모든 게시글을 보여줍니다.',
    type: () => Posts_dto,
  })
  async findAll(): Promise<{ posts: Post_dto[] }> {
    return { posts: await this.postService.findAll() };
  }

  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new AuthGuard())
  @ApiOkResponse({
    description: '자신의 게시글과 관련된 정보들을 보여줍니다.',
    type: () => Posts_dto,
  })
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
    required: true,
  })
  @ApiQuery({
    name: 'type',
    type: 'string',
    example: ['own', 'notification'],
    default: 'own',
    description:
      '자신이 쓴 글(own) 혹은, 자신이 쓴 기존의 글에 타인이 새롭게 단 댓글(notification)을 불러옵니다.',
  })
  @ApiQuery({
    name: 'list',
    type: 'string',
    example: ['posts', 'replies', 'likes'],
    description:
      'own일 경우, posts와 replies는 자신의 게시글과 댓글이며 likes는 자신이 추천한 게시글입니다. notification의 경우, posts는 자신의 게시글에 단 타인의 댓글을 replies는 자신의 댓글에 단 타인의 댓글을 불러오고 likes는 존재하지 않습니다.',
    default: 'posts',
  })
  async getFilter(
    @Session() session: { user_id: number },
    @Query() query: Post_filer_query,
  ) {
    return {
      posts: await this.postService.filter(
        query.type,
        query.list,
        session.user_id,
      ),
    };
  }

  @Get('/:post_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  // swagger
  @ApiOkResponse({
    description: '특정 게시글을 댓글 목록들을 포함하여 전체를 확인합니다.',
    type: () => Post_all_dto,
  })
  @ApiParam({
    description:
      '포스트의 id를 입력하세요. 댓글이 아닌 포스트의 id가 필요합니다.',
    type: 'number',
    name: 'post_id',
  })
  async findOne(@Param() params: Post_param_postId) {
    return await this.postService.findOne(params.post_id);
  }

  @Get('/:post_id/like')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(new AuthGuard())
  // swagger
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
    required: true,
  })
  @ApiParam({
    description:
      '포스트의 id를 입력하세요. 댓글이 아닌 포스트의 id가 필요합니다.',
    type: 'number',
    name: 'post_id',
  })
  @ApiOkResponse({
    description: '해당 게시글을 추천합니다. 로그인 인증이 필요합니다.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', default: `추천 작업이 완료됐습니다.` },
        like: { type: 'boolean' },
      },
    },
  })
  async clickLike(
    @Session() session: { user_id: number },
    @Param() params: Post_param_postId,
  ) {
    const result = await this.postService.like(params.post_id, session.user_id);
    return { message: `추천 작업이 완료됐습니다.`, like: result };
  }

  @Patch('/:post_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(new AuthGuard())
  // swagger
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
    required: true,
  })
  @ApiParam({
    description:
      '포스트의 id를 입력하세요. 댓글이 아닌 포스트의 id가 필요합니다.',
    type: 'number',
    name: 'post_id',
  })
  @ApiOkResponse({
    description: '해당 게시글을 수정합니다. 로그인 인증이 필요합니다.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', default: `게시글 수정이 완료됐습니다.` },
        like: { type: 'boolean' },
      },
    },
  })
  @ApiBody({
    description: '수정하기 위한 이미지 파일과 텍스트가 필요합니다.',
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string', nullable: false },
        img: { type: 'string', format: 'binary', nullable: true },
      },
    },
  })
  async edit(
    @Body()
    body: Post_body,
    @Session() session: { user_id: number },
    @Param() params: Post_param_postId,
  ) {
    await this.postService.update(
      params.post_id,
      session.user_id,
      body.content,
      body.img,
    );
    return { message: `게시글 수정이 완료됐습니다.` };
  }
}
