import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { weekDays } from './call.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';
import { Repository } from 'typeorm';

describe('CallService', () => {
  let callService: CallService;
  let callRepository: Repository<Call>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallService,
        {
          provide: getRepositoryToken(Call),
          useValue: {
            find: () => [
              { // Friday
                id: '12',
                called_at: new Date('2019-04-12T19:29:00.000Z'),
              },
              { // Friday
                id: '13',
                called_at: new Date('2019-04-19T19:29:00.000Z'),
              },
              { // Monday
                id: '14',
                called_at: new Date('2019-04-15T19:29:00.000Z'),
              },
            ],
          },
        },
      ],
    }).compile();
    callService = module.get<CallService>(CallService);
    callRepository = module.get<Repository<Call>>(getRepositoryToken(Call));
  });

  it('should be defined', () => {
    expect(callRepository).toBeDefined();
    expect(callService).toBeDefined();
  });

  it('should return a list of all calls', async () => {
    const response = await callService.findAll();
    expect(response).toMatchObject([
      {
        id: '12',
        called_at: new Date('2019-04-12T19:29:00.000Z'),
      },
      {
        id: '13',
        called_at: new Date('2019-04-19T19:29:00.000Z'),
      },
      {
        id: '14',
        called_at: new Date('2019-04-15T19:29:00.000Z'),
      },
    ]);
  });

  it('should return a list of Monday calls', async () => {
    const response = await callService.getCallsOnWeekDay(weekDays.Monday);
    expect(response).toMatchObject([
      {
        id: '14',
        called_at: new Date('2019-04-15T19:29:00.000Z'),
      },
    ]);
  });

  it('should return a list of Friday calls', async () => {
    const response = await callService.getCallsOnWeekDay(weekDays.Friday);
    expect(response).toMatchObject([
      {
        id: '12',
        called_at: new Date('2019-04-12T19:29:00.000Z'),
      },
      {
        id: '13',
        called_at: new Date('2019-04-19T19:29:00.000Z'),
      },
    ]);
  });
});