import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { ICheapSharkResponse } from './interfaces/cheapSharkResponse.interface';
import {ICheapSharkDealDetailResponse} from './interfaces/cheapSharkDealDetailRes.interface';
import {IGame} from './interfaces/game.interface';

@Injectable()
export class GameService {

  static apiURI = 'http://www.cheapshark.com/api/1.0/deals';
  static storeID = 1;
  static searchPattern = encodeURI('grand theft auto');

  /**
   * Returns list of games
   */
  public async getGames(): Promise<IGame[]> {
    const dealList = await this.fetchGameInfo(GameService.searchPattern);
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

  private async fetchGameInfo(pattern: string): Promise<ICheapSharkResponse[]> {
    const res = await Axios.get(`${GameService.apiURI}?storeID=${GameService.storeID}&desc=0&title=${pattern}&pageSize=20`);
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
