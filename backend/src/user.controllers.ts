import { Body, Controller, Get, Post, Query, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getUser(@Session() session: { user_id: number }) {}

  @Get('/filter')
  search(@Query('name') name: string) {}

  @Post('/regist')
  regist(@Body() body: { email: string; name: string; pwd: string }) {}

  @Post('/login')
  login(@Body() body: { id_str: string; pwd: string }) {}
}
