import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from 'src/prisma.service';
import { TransactionHistoriesService } from '../transaction-histories/transaction-histories.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, TransactionHistoriesService],
})
export class TransactionsModule {}
