import { Test, TestingModule } from '@nestjs/testing';
import { TaobaoController } from './taobao.controller';

describe('TaobaoController', () => {
  let controller: TaobaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaobaoController],
    }).compile();

    controller = module.get<TaobaoController>(TaobaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
