import { PrismaClient } from '@prisma/client';
import { accountFactory } from '../factories/account.factory';

export async function seedAccounts(prisma: PrismaClient) {
  try {
    const numberOfAccounts = 50;

    const users = await prisma.user.findMany();
    const userIds = users.map(user => user.id);

    await Promise.all(
      Array.from({ length: numberOfAccounts }, () => accountFactory(prisma, userIds)),
    );

    console.log('Accounts seeded successfully:');
  } catch (error) {
    console.error('Error seeding accounts:', error);
  }
}
