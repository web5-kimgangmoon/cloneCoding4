import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CatchEverythingFilter } from './http-exception.filter';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { LoggingInterceptor } from './logging.interceptor';
// import { logger } from './logger.middleware';

async function bootstrap() {
  // const app = await NestFactory.create(Appmodule);
  // app.use(logger);
  // await app.listen(process.env.PORT ?? 3000);

  // const app = await NestFactory.create(Appmodule);
  // const { httpAdapter } = app.get(HttpAdapterHost);

  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // // app.useGlobalFilters(new CatchEverythingFilter());
  // await app.listen(process.env.PORT ?? 3000);

  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RolesGuard());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
