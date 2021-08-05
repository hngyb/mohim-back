import { Test, TestingModule } from '@nestjs/testing';
import { BelongTosController } from './belong-tos.controller';

describe('BelongTosController', () => {
  let controller: BelongTosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BelongTosController],
    }).compile();

    controller = module.get<BelongTosController>(BelongTosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
