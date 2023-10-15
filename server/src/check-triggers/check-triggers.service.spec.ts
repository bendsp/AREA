import { Test, TestingModule } from '@nestjs/testing';
import { CheckTriggersService } from './check-triggers.service';

describe('CheckTriggersService', () => {
  let service: CheckTriggersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckTriggersService],
    }).compile();

    service = module.get<CheckTriggersService>(CheckTriggersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
