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
import { Reply_id_query } from './class-validator/id_check';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { PostDto, PostsDto } from './dto/post.dto';
import { filer_query } from './class-validator/filter_check';

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
  })
  @ApiQuery({
    required: false,
    name: 'reply',
    description: 'reply하는 post일 경우, 덧붙일 post의 id를 입력하세요.',
    type: 'number',
  })
  //
  async post(
    @Body() body: { content: string; img?: string },
    @Session() session: { user_id: number },
    @Query() query?: { reply: number },
  ) {
    await this.postService.create(
      body.content,
      session.user_id,
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
    type: () => PostsDto,
  })
  async findAll(): Promise<{ posts: PostDto[] }> {
    return { posts: await this.postService.findAll() };
  }

  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new AuthGuard())
  @ApiOkResponse({
    description: '자신의 게시글과 관련된 정보들을 보여줍니다.',
  })
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
    required: false,
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
    @Query() query: filer_query,
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
  findOne(@Param('post_id') id: string) {}

  @Patch('/:post_id/like')
  clickLike(
    @Session() session: { user_id: number },
    @Param('post_id') id: string,
  ) {}
}
