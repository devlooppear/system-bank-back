import { PrismaClient } from '@prisma/client';
import { transactionHistoryFactory } from '../factories/transaction-history.factory';

export async function seedTransactionHistories(prisma: PrismaClient) {
  try {
    const numberOfHistories = 100;

    const transactions = await prisma.transaction.findMany();
    const transactionIds = transactions.map((transaction) => transaction.id);

    const users = await prisma.user.findMany();
    const userIds = users.map((user) => user.id);

    await Promise.all(
      Array.from({ length: numberOfHistories }, () =>
        transactionHistoryFactory(prisma, transactionIds, userIds),
      ),
    );

    console.log('Transaction histories seeded successfully:');
  } catch (error) {
    console.error('Error seeding transaction histories:', error);
  }
}
