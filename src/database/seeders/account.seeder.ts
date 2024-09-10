import { PrismaClient } from '@prisma/client';
import { accountFactory } from '../factories/account.factory';

export async function seedAccounts(prisma: PrismaClient) {
  try {
    const numberOfAccounts = 50;

    await Promise.all(
      Array.from({ length: numberOfAccounts }, () => accountFactory(prisma)),
    );

    console.log('Accounts seeded successfully:');
  } catch (error) {
    console.error('Error seeding accounts:', error);
  }
}
