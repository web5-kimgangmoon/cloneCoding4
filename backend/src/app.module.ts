import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Post_module } from './post.module';
import { User_module } from './user.module';
import { Img_module } from './img.module';

@Module({
  imports: [Post_module, User_module, Img_module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
