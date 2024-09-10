import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seeder';
import { seedAccounts } from './account.seeder';
import { seedTransactionHistories } from './transaction-histories.seeder';
import { seedTransactions } from './transactions.seeder';

const prisma = new PrismaClient();

async function seed() {
  try {
    await seedUsers(prisma);

    await seedAccounts(prisma);

    await seedTransactions(prisma);

    await seedTransactionHistories(prisma);
    
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
