import { Module } from '@nestjs/common';
import { GameModule } from './modules/game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallModule } from './modules/call/call.module';

@Module({
  imports: [
    GameModule,
    TypeOrmModule.forRoot(),
    CallModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
