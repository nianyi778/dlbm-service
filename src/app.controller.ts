import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { PracticeInterceptor } from './common/interceptor/practice.interceptor';

@Controller()
@UseInterceptors(PracticeInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {
    // 123
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
