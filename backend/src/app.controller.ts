import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<{ id: number; postId: number; userId: number }[]> {
    return await this.appService.getLike();
  }

  @Get('/add')
  async addHello(): Promise<string> {
    await this.appService.addLike();
    return 'alright';
  }
}
