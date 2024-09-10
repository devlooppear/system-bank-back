import { PrismaClient } from '@prisma/client';
import { TransactionHistory } from 'src/models/transaction-histories/entities/transaction-history.entity';
import { faker } from '@faker-js/faker';

export const transactionHistoryFactory = async (
  prisma: PrismaClient,
  transactionIds: number[],
  userIds: number[],
): Promise<TransactionHistory> => {
  const transactionHistoryData = {
    transaction_id: faker.helpers.arrayElement(transactionIds),
    user_id: faker.helpers.arrayElement(userIds),
    movement_date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  const createdTransactionHistory = await prisma.transactionHistory.create({
    data: transactionHistoryData,
  });

  return createdTransactionHistory;
};
