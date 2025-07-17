import { Module } from '@nestjs/common';
import { User_controller } from './user.controllers';
import { User_service } from './user.service';

@Module({
  controllers: [User_controller],
  providers: [User_service],
  exports: [User_service],
})
export class User_module {}
