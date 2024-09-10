import { PrismaClient } from '@prisma/client';
import { transactionFactory } from '../factories/transactions.factory';

export async function seedTransactions(prisma: PrismaClient) {
  try {
    const numberOfTransactions = 100;

    await Promise.all(
      Array.from({ length: numberOfTransactions }, () =>
        transactionFactory(prisma),
      ),
    );

    console.log('Transactions seeded successfully:');
  } catch (error) {
    console.error('Error seeding transactions:', error);
  }
}
