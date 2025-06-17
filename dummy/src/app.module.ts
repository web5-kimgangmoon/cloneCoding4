// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { Module } from '@nestjs/common';
import { CatsModule } from './cat.module';

// @Module({
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
@Module({
  imports: [CatsModule],
})
export class AppModule {}
