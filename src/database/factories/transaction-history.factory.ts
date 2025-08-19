import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { TransactionHistory } from '../../models/transaction-histories/entities/transaction-history.entity';

export const transactionHistoryFactory = async (
  prisma: PrismaClient,
): Promise<TransactionHistory> => {
  const users = await prisma.user.findMany();
  const userIds = users.map((user) => user.id);

  const transactions = await prisma.transaction.findMany();
  const transactionIds = transactions.map((transaction) => transaction.id);

  const transactionHistoryData = {
    transaction_id: faker.helpers.arrayElement(transactionIds),
    user_id: faker.helpers.arrayElement(userIds),
    movement_date: new Date(),
  };

  const createdTransactionHistory = await prisma.transactionHistory.create({
    data: transactionHistoryData,
  });

  return createdTransactionHistory;
};
