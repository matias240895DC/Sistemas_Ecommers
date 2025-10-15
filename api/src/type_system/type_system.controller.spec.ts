import { Test, TestingModule } from '@nestjs/testing';
import { TypeSystemController } from './type_system.controller';

describe('TypeSystemController', () => {
  let controller: TypeSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeSystemController],
    }).compile();

    controller = module.get<TypeSystemController>(TypeSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
