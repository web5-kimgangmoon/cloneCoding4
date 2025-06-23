// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// import { Module } from "@nestjs/common";
// import { DatabaseModule } from "./database.module";

// @Module({
//   imports: [DatabaseModule.forRoot([])],
// })
// export class AppModule{}

// import { Module } from '@nestjs/common';
// import { CatsModule } from './cat.module';

// @Module({
//   imports: [CatsModule],
// })
// export class AppModule {}

// import {
//   MiddlewareConsumer,
//   Module,
//   NestModule,
//   RequestMethod,
// } from '@nestjs/common';
// import { LoggerMiddleware } from './logger.middleware';
// import { CatsModule } from './cat.module';

// @Module({
//   imports: [CatsModule],
// })
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: 'cats', method: RequestMethod.GET });
//   }
// }

import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { CatsModule } from './cat.module';
// import { LoggerMiddleware } from './logger.middleware';
import { CatController } from './cat.controller';
import { logger } from './logger.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { LoggingInterceptor } from './logging.interceptor';
// import { HttpExceptionFilte } from './http-exception.filter';

// @Module({
//   // imports: [CatsModule],
//   // providers: [
//   //   {
//   //     provide: APP_FILTER,
//   //     useClass: HttpExceptionFilter,
//   //   },
//   // ],
// })
// export class Appmodule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     //   consumer
//     //     .apply(LoggerMiddleware)
//     //     .exclude(
//     //       { path: 'cats', method: RequestMethod.GET },
//     //       { path: 'cats', method: RequestMethod.POST },
//     //       'cats/{*splat}',
//     //     )
//     //     .forRoutes(CatController);
//     // }
//     // consumer.apply(cors(), helmet(), logger).forRoutes(CatController);
//     consumer.apply(logger).forRoutes(CatController);
//   }
// }

// @Module({
//   providers: [
//     {
//       provide: APP_PIPE,
//       useClass: ValidationPipe,
//     },
//   ],
// })
// export class AppModule {}

// @Module({
//   providers: [{ provide: APP_GUARD, useClass: RolesGuard }],
// })
// export class AppModule {}

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
