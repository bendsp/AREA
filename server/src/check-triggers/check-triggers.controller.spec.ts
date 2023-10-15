import { Test, TestingModule } from '@nestjs/testing';
import { CheckTriggersController } from './check-triggers.controller';

describe('CheckTriggersController', () => {
  let controller: CheckTriggersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckTriggersController],
    }).compile();

    controller = module.get<CheckTriggersController>(CheckTriggersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
