import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService} from './game.service';

describe('Game Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();
  });
  it('should be defined', () => {
    const controller: GameController = module.get<GameController>(GameController);
    expect(controller).toBeDefined();
  });
});
