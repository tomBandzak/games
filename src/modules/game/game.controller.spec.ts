import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GameService} from './game.service';
import { CallService } from '../call/call.service';
import { Call } from '../call/entities/call.entity';

describe('Game Controller', () => {
  let module: TestingModule;
  let controller: GameController;
  let callService: CallService;
  let gameService: GameService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        GameService,
        CallService,
        {
          provide: getRepositoryToken(Call),
          useValue: { create: () => {}, save: () => {} },
        },
      ],
    }).compile();

  });

  it('should be defined', () => {
    controller = module.get<GameController>(GameController);
    callService = module.get<CallService>(CallService);
    gameService = module.get<GameService>(GameService);
    expect(controller).toBeDefined();
  });

  it('should call log function to save the call', async () => {
    const getGamesSpy = jest.spyOn(gameService,'getGames').mockImplementation(() => {});
    const logSpy = jest.spyOn(callService,'log').mockImplementation(() => {});
    await controller.getGameInfo();
    expect(getGamesSpy).toBeCalled();
    expect(logSpy).toBeCalled();
  });
});
