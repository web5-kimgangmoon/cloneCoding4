import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post.module';
import { UserModule } from './user.module';

@Module({
  imports: [PostModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
