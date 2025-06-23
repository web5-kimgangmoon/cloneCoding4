// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

import {
  Body,
  Controller,
  DefaultValuePipe,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cat.service';
import { Cat } from './interface/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { Roles } from './roles.decorators';
import { LoggingInterceptor } from './logging.interceptor';
import { User } from './user.decorator';
// import { createCatSchema, ZodValidationPipe } from './validation.pipe';
// import { HttpExceptionFilter } from './http-exception.filter';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
// @UseInterceptors(LoggingInterceptor)
// @UseInterceptors(new LoggingInterceptor())
export class CatController {
  constructor(private catsService: CatsService) {}

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  // @Get()
  // async findAll(): Promise<Cat[]> {
  //   // throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
  //   return this.catsService.findAll();
  // }

  // @Get()
  // async findAll() {
  //   try {
  //     await this.catsService.findAll();
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.FORBIDDEN,
  //         error: 'This is a custom message',
  //       },
  //       HttpStatus.FORBIDDEN,
  //       {
  //         cause: error,
  //       },
  //     );
  //   }
  // }
  // @Get()
  // async  findAll(){
  //   throw new ForbiddenException();
  // }

  // @Get('breed')
  // findAll(): string {
  //   return 'this action returns all cats';
  // }
  // @Post()
  // // @UseFilters(new HttpExceptionFilter())
  // async create(@Body() createCatDto: CreateCatDto) {
  //   throw new ForbiddenException();
  // }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.catsService.findOne(id);
  // }
  // @Get(':id')
  // async findOne(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ) {
  //   return this.catsService.findOne(id);
  // }
  // @Get()
  // async findOne(@Query('id', ParseIntPipe) id: number) {
  //   return this.catsService.findOne(id);
  // }
  // @Get(':uuid')
  // async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  //   return this.catsService.findOne(uuid);
  // }

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto){
  //   this.catsService.create(createCatDto);
  // }

  // @Post()
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }
  // @Post()
  // async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }
  // @Get(':id')
  // async findOne(@Param('id', new ParseIntPipe()) id) {
  //   return this.catsService.findOne(id);
  // }
  // @Get()
  // async findOne(@User() user: string[]) {
  //   console.log(user);
  // }

  // @Get()
  // async findOne(@User('firstName') firstName: string) {
  //   console.log(`Hello ${firstName}`);
  // }

  @Get()
  async findOne(
    @User(new ValidationPipe({ validateCustomDecorators: true }))
    user: string[],
  ) {
    console.log(user);
  }

  // @Get("id")
  // findOne(@Param("id", UserByIdPipe) userEntity: UserEntity){
  //   return userEntity;
  // }

  @Get()
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnely: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return this.catsService.findAll();
  }

  @Post()
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
