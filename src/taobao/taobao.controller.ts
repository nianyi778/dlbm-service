import { Controller, Get, Query } from '@nestjs/common';
import { TaobaoService } from './taobao.service';
import { MaterialRecommendQuery } from './taobao.type';
// import { AuthGuard } from '@nestjs/passport';

@Controller('taobao')
export class TaobaoController {
  constructor(private readonly moduleService: TaobaoService) {
    // 23
  }

  @Get('/material/recommend')
  // @UseGuards(AuthGuard('jwt'))
  async getData(@Query() query: MaterialRecommendQuery): Promise<unknown[]> {
    const { pageSize = 1, pageNum = 20 } = query;
    return await this.moduleService.getData({ pageSize, pageNum });
  }
}
