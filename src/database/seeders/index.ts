import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seeder';

const prisma = new PrismaClient();

async function seed() {
  try {
    await seedUsers(prisma);
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
