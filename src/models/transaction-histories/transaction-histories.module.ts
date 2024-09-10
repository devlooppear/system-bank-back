import { Module } from '@nestjs/common';
import { TransactionHistoriesService } from './transaction-histories.service';
import { TransactionHistoriesController } from './transaction-histories.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TransactionHistoriesController],
  providers: [TransactionHistoriesService, PrismaService],
})
export class TransactionHistoriesModule {}
