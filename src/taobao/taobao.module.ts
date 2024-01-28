import { Module } from '@nestjs/common';
import { TaobaoController } from './taobao.controller';
import { TaobaoService } from './taobao.service';

@Module({
  controllers: [TaobaoController],
  providers: [TaobaoService],
})
export class TaobaoModule {
  // 123
}
