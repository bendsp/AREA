import { Test, TestingModule } from '@nestjs/testing';
import { CheckTrigersController } from './check-trigers.controller';

describe('CheckTrigersController', () => {
  let controller: CheckTrigersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckTrigersController],
    }).compile();

    controller = module.get<CheckTrigersController>(CheckTrigersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
