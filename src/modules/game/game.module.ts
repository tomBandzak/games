import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { CallModule } from '../call/call.module';
import { CallService } from '../call/call.service';

@Module({
  imports: [CallModule],
  providers: [
    GameService,
    CallService,
  ],
  controllers: [GameController],
})
export class GameModule {}
