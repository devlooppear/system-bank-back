import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { PrismaService } from './prisma.service';
import { UsersModule } from './models/users/users.module';
import { AccountsModule } from './models/accounts/accounts.module';
import { TransactionsModule } from './models/transactions/transactions.module';
import { TransactionHistoriesModule } from './models/transaction-histories/transaction-histories.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/login').forRoutes('*');
  }
}
