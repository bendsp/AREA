import { Test, TestingModule } from '@nestjs/testing';
import { NbaService } from './nba.service';

describe('NbaService', () => {
  let service: NbaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NbaService],
    }).compile();

    service = module.get<NbaService>(NbaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
