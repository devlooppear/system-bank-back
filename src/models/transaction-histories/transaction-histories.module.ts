import { Module } from '@nestjs/common';
import { TransactionHistoriesService } from './transaction-histories.service';
import { TransactionHistoriesController } from './transaction-histories.controller';

@Module({
  controllers: [TransactionHistoriesController],
  providers: [TransactionHistoriesService],
})
export class TransactionHistoriesModule {}
