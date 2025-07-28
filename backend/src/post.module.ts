import { Module } from '@nestjs/common';
import { Post_controller } from './post.controller';
import { Post_service } from './post.service';

@Module({
  controllers: [Post_controller],
  providers: [Post_service],
  exports: [Post_service],
})
export class Post_module {}
