import { PrismaClient } from '@prisma/client';
import { transactionHistoryFactory } from '../factories/transaction-history.factory';

export async function seedTransactionHistories(prisma: PrismaClient) {
  try {
    const numberOfHistories = 100;

    await Promise.all(
      Array.from({ length: numberOfHistories }, () =>
        transactionHistoryFactory(prisma),
      ),
    );

    console.log('Transaction histories seeded successfully:');
  } catch (error) {
    console.error('Error seeding transaction histories:', error);
  }
}
