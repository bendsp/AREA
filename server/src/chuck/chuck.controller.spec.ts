import { Test, TestingModule } from '@nestjs/testing';
import { ChuckController } from './chuck.controller';

describe('ChuckController', () => {
  let controller: ChuckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChuckController],
    }).compile();

    controller = module.get<ChuckController>(ChuckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
