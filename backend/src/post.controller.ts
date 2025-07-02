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
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { zod_validation_pipe } from './zod/zod_validation_pipe';
import { Create_id, create_id_schema } from './zod/id_check';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  @UsePipes(new zod_validation_pipe(create_id_schema))
  @HttpCode(HttpStatus.NO_CONTENT)
  async post(
    @Body() body: { content: string; img?: string },
    @Session() session: { user_id: number },
    @Query('reply') reply_id?: Create_id,
  ) {
    this.postService.create(body.content, session.user_id, body.img, reply_id);
  }

  @Get('/all')
  findAll(@Session() session: { user_id: number }) {}

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
