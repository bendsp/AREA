import { Test, TestingModule } from '@nestjs/testing';
import { CoingekoService } from './coingeko.service';

describe('CoingekoService', () => {
  let service: CoingekoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoingekoService],
    }).compile();

    service = module.get<CoingekoService>(CoingekoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
