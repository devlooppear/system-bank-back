import { Test, TestingModule } from '@nestjs/testing';
import { TransactionHistoriesService } from './transaction-histories.service';

describe('TransactionHistoriesService', () => {
  let service: TransactionHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionHistoriesService],
    }).compile();

    service = module.get<TransactionHistoriesService>(TransactionHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
