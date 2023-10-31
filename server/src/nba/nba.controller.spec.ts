import { Test, TestingModule } from '@nestjs/testing';
import { NbaController } from './nba.controller';

describe('NbaController', () => {
  let controller: NbaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NbaController],
    }).compile();

    controller = module.get<NbaController>(NbaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
