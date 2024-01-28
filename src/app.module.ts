import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaobaoModule } from './taobao/taobao.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [TaobaoModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 123
}
