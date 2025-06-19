import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Appmodule } from './app.module';
import { CatchEverythingFilter } from './http-exception.filter';
import { AllExceptionsFilter } from './all-exceptions.filter';
// import { logger } from './logger.middleware';

async function bootstrap() {
  // const app = await NestFactory.create(Appmodule);
  // app.use(logger);
  // await app.listen(process.env.PORT ?? 3000);
  const app = await NestFactory.create(Appmodule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalFilters(new CatchEverythingFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
