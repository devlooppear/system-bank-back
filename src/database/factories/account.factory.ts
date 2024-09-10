import { AccountType, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Account } from 'src/models/accounts/entities/account.entity';

export const accountFactory = async (
  prisma: PrismaClient,
): Promise<Account> => {
  const minBalance = 100;
  const maxBalance = 10000;
  const balance =
    Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;
  const users = await prisma.user.findMany();
  const userIds = users.map((user) => user.id);
  const accountType = faker.helpers.arrayElement(Object.values(AccountType));

  const accountData = {
    user_id: faker.helpers.arrayElement(userIds),
    balance: balance,
    account_type: accountType,
  };

  const createdAccount = await prisma.account.create({
    data: accountData,
  });

  return createdAccount;
};
