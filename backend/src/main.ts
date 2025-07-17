import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as mkMySQLSession from 'express-mysql-session';

export const prisma = new PrismaClient();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // api 문서 swagger로
  const config = new DocumentBuilder()
    .setTitle('board api')
    .setDescription('클론코딩 게시글의 api 문서입니다')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_document', app, documentFactory);

  const MySQLSession = mkMySQLSession(session);
  const sessionStore = new MySQLSession({
    port: 3306,
    host: 'localhost',
    user: 'session_manager',
    password: '1234',
    database: 'session_list',
    expiration: 1000 * 60 * 30,
  });
  app.use(
    session({
      secret: 'strike',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);

  // sessionStore
  //   .onReady()
  //   .then(() => {
  //     console.log('MySQLStore ready');
  //   })
  //   .catch((error) => console.log(error));
}
bootstrap()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
