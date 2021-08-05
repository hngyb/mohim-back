import { Test, TestingModule } from '@nestjs/testing';
import { BelongTosService } from './belong-tos.service';

describe('BelongTosService', () => {
  let service: BelongTosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BelongTosService],
    }).compile();

    service = module.get<BelongTosService>(BelongTosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
