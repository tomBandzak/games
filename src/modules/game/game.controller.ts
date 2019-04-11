import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';
import { CallService } from '../call/call.service';

@Controller('games')
export class GameController {

  constructor(
    private readonly gameService: GameService,
    private readonly callService: CallService,
  ) {}

  @Get('/')
  async getGameInfo() {
    try {
      this.callService.log();
      return await this.gameService.getGames();
    } catch (e) {
      throw Error(e);
    }
  }
}
