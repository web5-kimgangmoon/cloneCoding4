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
import { zod_validation_pipe } from './zod/zod_validation_pipe';
import { Create_id, create_id_schema } from './zod/id_check';
import { AuthGuard } from './auth.guard';
import { Validation_pipe } from './class-validator/validation.pipe';
import { Reply_id_query } from './class-validator/id_check';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(new AuthGuard())
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: '게시글을 생성합니다.',
    schema: {
      type: 'object',
      properties: { message: { type: 'string', default: 'Post is created' } },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',

      properties: { img: { type: 'string', format: 'binary', nullable: true } },
    },
  })
  // @Api
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
  async findAll(@Session() session: { user_id?: number }) {
    return await this.postService.findAll(session.user_id);
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
