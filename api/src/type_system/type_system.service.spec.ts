import { Test, TestingModule } from '@nestjs/testing';
import { TypeSystemService } from './type_system.service';

describe('TypeSystemService', () => {
  let service: TypeSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeSystemService],
    }).compile();

    service = module.get<TypeSystemService>(TypeSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
