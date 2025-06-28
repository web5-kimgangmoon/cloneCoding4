import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  post(
    @Query('reply') replyId: string,
    @Body() body: { content: string; img?: string },
  ) {}

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
