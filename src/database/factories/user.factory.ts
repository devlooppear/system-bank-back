import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/users/entities/user.entity';

const SALT_ROUNDS = 10;

export const userFactory = async (
  prisma: PrismaClient,
): Promise<Omit<User, 'password'>> => {
  const password = faker.internet.password();
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const userData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const createdUser = await prisma.users.create({
    data: userData,
  });

  return {
    id: createdUser.id,
    name: createdUser.name,
    email: createdUser.email,
    created_at: createdUser.created_at,
    updated_at: createdUser.updated_at,
  };
};
