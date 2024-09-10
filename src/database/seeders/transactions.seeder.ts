import { PrismaClient } from '@prisma/client';
import { transactionFactory } from '../factories/transactions.factory';

export async function seedTransactions(prisma: PrismaClient) {
  try {
    const accounts = await prisma.account.findMany();
    const accountIds = accounts.map((account) => account.id);

    const numberOfTransactions = 100;
    
    await Promise.all(
      Array.from({ length: numberOfTransactions }, () =>
        transactionFactory(prisma, accountIds),
      ),
    );

    console.log('Transactions seeded successfully:');
  } catch (error) {
    console.error('Error seeding transactions:', error);
  }
}
