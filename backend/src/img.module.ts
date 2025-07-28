import { Module } from '@nestjs/common';
import { Img_service } from './img.service';
import { Img_controller } from './img.controller';

@Module({
  controllers: [Img_controller],
  providers: [Img_service],
  exports: [Img_service],
})
export class Img_module {}
