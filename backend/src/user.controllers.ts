import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User_service } from './user.service';
import { AuthGuard, AuthGuard_reverse } from './auth.guard';
import { ApiBody, ApiHeader, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { User_dto, Users_dto } from './dto/user.dto';
import {
  User_filter_query,
  User_login_body,
  User_regist_body,
} from './class-validator/user.check';
import { Request, Response } from 'express';

@Controller('/user')
export class User_controller {
  constructor(private readonly user_service: User_service) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new AuthGuard())
  // swagger
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
    required: true,
  })
  @ApiOkResponse({
    description: '자신(유저)의 정보를 받아옵니다.',
    type: () => User_dto,
  })
  async getUser(@Session() session: { session_id: number }) {
    return this.user_service.findOne(session.session_id);
  }

  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  // swagger
  @ApiOkResponse({
    description: '해당하는 유저들의 정보를 받아옵니다.',
    type: () => Users_dto,
  })
  @ApiQuery({ name: 'name', type: 'string' })
  async search(@Query() { name }: User_filter_query) {
    return this.user_service.findAll(name);
  }
  @Post('/regist')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  // swagger
  @ApiOkResponse({
    description: '해당 정보로 회원가입을 합니다.',
    schema: {
      type: 'object',
      properties: { message: { type: 'string', default: 'user is created' } },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        pwd: {
          type: 'string',
        },
      },
    },
  })
  async regist(@Body() body: User_regist_body) {
    await this.user_service.create(body.email, body.name, body.pwd);
    return { message: 'user is created' };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new AuthGuard_reverse())
  // swagger
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
    required: true,
  })
  @ApiOkResponse({
    description: '해당 정보로 로그인을 합니다.',
    schema: {
      type: 'object',
      properties: { message: { type: 'string', default: 'user is logined.' } },
    },
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id_str: {
          type: 'string',
        },
        pwd: {
          type: 'string',
        },
      },
    },
  })
  async login(
    @Body() body: User_login_body,
    @Session() session: { session_id: number },
  ) {
    const user = await this.user_service.login(body.id_str, body.pwd);
    session.session_id = user.id;
    return { message: 'user is logined' };
  }

  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new AuthGuard())
  // swagger
  @ApiHeader({
    name: 'session_id',
    description: '인증을 위한 세션id가 필요합니다.',
    required: true,
  })
  @ApiOkResponse({
    description: '스스로를 로그아웃합니다.',
    schema: {
      type: 'object',
      properties: { message: { type: 'string', default: 'user is logouted.' } },
    },
  })
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) throw new InternalServerErrorException('logut is failed.');
      else res.status(200).send({ message: 'user is logouted' });
    });
  }
}
