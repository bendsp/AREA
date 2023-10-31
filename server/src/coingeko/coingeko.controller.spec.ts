import { Test, TestingModule } from '@nestjs/testing';
import { CoingekoController } from './coingeko.controller';

describe('CoingekoController', () => {
  let controller: CoingekoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoingekoController],
    }).compile();

    controller = module.get<CoingekoController>(CoingekoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
