import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Img_service } from './img.service';
import { Img_find_img_query } from './class-validator/img.check';
import { Response } from 'express';

@Controller('/img')
export class Img_controller {
  constructor(private readonly img_service: Img_service) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(HttpStatus.OK)
  //swagger
  @ApiHeader({
    name: 'content-type',
    description: '파일의 타입을 정의합니다.',
  })
  @ApiOkResponse({
    description: '불러올 이미지의 파일명을 쿼리로 받습니다.',
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiQuery({
    name: 'img',
    type: 'string',
    description: '불러올 파일명.',
  })
  async find_img(@Query() query: Img_find_img_query, @Res() res: Response) {
    const result = await this.img_service.findImg(query.img);
    res.setHeader('Content-Type', result.mimetype);
    return res.send(result.file);
  }
}
