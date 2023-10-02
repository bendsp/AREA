import { Test, TestingModule } from '@nestjs/testing';
import { AboutJsonController } from './about.json.controller';

describe('AboutJsonController', () => {
  let controller: AboutJsonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutJsonController],
    }).compile();

    controller = module.get<AboutJsonController>(AboutJsonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
