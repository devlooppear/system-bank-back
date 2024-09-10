import { PrismaClient } from '@prisma/client';
import { userFactory } from '../factories/user.factory';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function seedUsers(prisma: PrismaClient) {
  try {
    const defaultEmail = 'dev@metisbank.com';
    const defaultPassword = 'password';

    let user = await prisma.user.findUnique({
      where: { email: defaultEmail },
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(defaultPassword, SALT_ROUNDS);

      user = await prisma.user.create({
        data: {
          name: 'Developer',
          email: defaultEmail,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    } else {
      console.log('Default user already exists:', user);
    }

    const numberOfUsers = 25;

    await Promise.all(
      Array.from({ length: numberOfUsers }, () => userFactory(prisma)),
    );

    console.log('Additional users seeded successfully:');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}
