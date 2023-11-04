import { Test, TestingModule } from '@nestjs/testing';
import { ChuckService } from './chuck.service';

describe('ChuckService', () => {
  let service: ChuckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChuckService],
    }).compile();

    service = module.get<ChuckService>(ChuckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
