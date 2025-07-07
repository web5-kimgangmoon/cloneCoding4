import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUser(@Session() session: { user_id: number }) {}

  @Get('/filter')
  async search(@Query('name') name: string) {}

  @Post('/regist')
  @HttpCode(HttpStatus.CREATED)
  async regist(@Body() body: { email: string; name: string; pwd: string }) {
    await this.userService.create(body.email, body.name, body.pwd);
    return { message: 'user is created' };
  }

  @Post('/login')
  async login(@Body() body: { id_str: string; pwd: string }) {}
}
