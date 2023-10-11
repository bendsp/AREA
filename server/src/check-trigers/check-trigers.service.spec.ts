import { Test, TestingModule } from '@nestjs/testing';
import { CheckTrigersService } from './check-trigers.service';

describe('CheckTrigersService', () => {
  let service: CheckTrigersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckTrigersService],
    }).compile();

    service = module.get<CheckTrigersService>(CheckTrigersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
