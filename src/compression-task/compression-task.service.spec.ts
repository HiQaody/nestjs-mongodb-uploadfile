import { Test, TestingModule } from '@nestjs/testing';
import { CompressionTaskService } from './compression-task.service';

describe('CompressionTaskService', () => {
  let service: CompressionTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompressionTaskService],
    }).compile();

    service = module.get<CompressionTaskService>(CompressionTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
