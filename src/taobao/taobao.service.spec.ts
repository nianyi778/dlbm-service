import { Test, TestingModule } from '@nestjs/testing';
import { TaobaoService } from './taobao.service';

describe('TaobaoService', () => {
  let service: TaobaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaobaoService],
    }).compile();

    service = module.get<TaobaoService>(TaobaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
