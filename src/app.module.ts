import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { PrismaService } from './prisma.service';
import { UsersModule } from './models/users/users.module';
import { AccountsModule } from './models/accounts/accounts.module';
import { TransactionsModule } from './models/transactions/transactions.module';
import { TransactionHistoriesModule } from './models/transaction-histories/transaction-histories.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AccountsModule,
    TransactionsModule,
    TransactionHistoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
