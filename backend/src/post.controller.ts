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
    @Query() query: Reply_id_query,
  ) {
    await this.postService.create(
      body.content,
      session.user_id,
      body.img,
      query.reply,
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
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
  })
  async findAll(
    @Session() session: { user_id?: number },
  ): Promise<{ posts: PostDto[] }> {
    return { posts: await this.postService.findAll(session.user_id) };
  }

  @Get('/filter')
  getFilter(@Session() session: { user_id: number }) {}

  @Get('/:post_id')
  findOne(@Param('post_id') id: string) {}

  @Patch('/:post_id/like')
  clickLike(
    @Session() session: { user_id: number },
    @Param('post_id') id: string,
  ) {}
}
