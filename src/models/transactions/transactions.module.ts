import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionHistoriesService } from '../transaction-histories/transaction-histories.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, TransactionHistoriesService],
})
export class TransactionsModule {}
