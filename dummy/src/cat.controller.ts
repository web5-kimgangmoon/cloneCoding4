// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cat.service';
import { Cat } from './interface/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }

@Controller('cats')
export class CatController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  // @Get('breed')
  // findAll(): string {
  //   return 'this action returns all cats';
  // }
}
