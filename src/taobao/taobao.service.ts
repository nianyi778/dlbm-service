import { InternalServerErrorException, Injectable } from '@nestjs/common';
import TopClient from 'node-taobao-topclient';
import { appkey, appsecret, REST_URL } from '@/constants/taobaoConfig';
import { MaterialRecommendQuery } from './taobao.type';

@Injectable()
export class TaobaoService {
  async getData({
    pageSize,
    pageNum,
  }: MaterialRecommendQuery): Promise<unknown[]> {
    const client = new TopClient({
      appkey,
      appsecret,
      REST_URL,
    });

    let result;
    try {
      result = await client.execute('taobao.tbk.dg.material.recommend', {
        page_size: pageNum,
        page_no: pageSize,
        material_id: '13366',
        adzone_id: '114705200053',
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('查询失败');
    }
    return result;
  }
}
