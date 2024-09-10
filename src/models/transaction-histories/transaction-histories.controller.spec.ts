import { Test, TestingModule } from '@nestjs/testing';
import { TransactionHistoriesController } from './transaction-histories.controller';
import { TransactionHistoriesService } from './transaction-histories.service';

describe('TransactionHistoriesController', () => {
  let controller: TransactionHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionHistoriesController],
      providers: [TransactionHistoriesService],
    }).compile();

    controller = module.get<TransactionHistoriesController>(TransactionHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
