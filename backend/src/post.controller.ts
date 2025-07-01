import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ZodValidationPipe } from './zod/zodValidationPipe';
import { CreateId, createIdSchema } from './zod/idCheck';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  @UsePipes(new ZodValidationPipe(createIdSchema))
  async post(
    @Query('reply') replyId: CreateId,
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
