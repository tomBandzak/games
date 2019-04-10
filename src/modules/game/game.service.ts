import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { ICheapSharkResponse } from './interfaces/cheapSharkResponse.interface';
import {ICheapSharkDealDetailResponse} from './interfaces/cheapSharkDealDetailRes.interface';
import {IGame} from './interfaces/game.interface';

@Injectable()
export class GameService {

  /**
   * Returns list of games
   */
  public async getGames(): Promise<IGame[]> {
    const dealList = await this.fetchGameInfo();
    const games = dealList.map(async deal => {
      const detail = await this.fetchDealDetail(deal.dealID);

      return {
        name: detail.gameInfo.name,
        salePrice: Number(detail.gameInfo.salePrice),
        cheapestPrice: Number(detail.cheapestPrice.price),
        releaseDate: new Date(detail.gameInfo.releaseDate * 1000),
      };
    });

    return await Promise.all(games);
  }

  private async fetchGameInfo(): Promise<ICheapSharkResponse[]> {
    const res = await Axios.get('http://www.cheapshark.com/api/1.0/deals?storeID=1&desc=0&title=grand%20theft%20auto&pageSize=20&sortBy=Price&desc=0');
    if (res.status === 200) {
      return res.data;
    }
    throw new Error('Error fetching games data');
  }

  private async fetchDealDetail(id: string): Promise<ICheapSharkDealDetailResponse> {
    const res = await Axios.get('http://www.cheapshark.com/api/1.0/deals?id=' + id);
    if (res.status === 200) {
      return res.data;
    }
    throw new Error('Error fetching games data');
  }
}
