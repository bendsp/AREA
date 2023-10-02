import { Test, TestingModule } from '@nestjs/testing';
import { AboutJsonService } from './about.json.service';

describe('AboutJsonService', () => {
  let service: AboutJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutJsonService],
    }).compile();

    service = module.get<AboutJsonService>(AboutJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
