import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Account } from 'src/models/accounts/entities/account.entity';

export const accountFactory = async (
  prisma: PrismaClient,
  userIds: number[],
): Promise<Account> => {
  const minBalance = 100;
  const maxBalance = 10000;
  const balance =
    Math.floor(Math.random() * (maxBalance - minBalance + 1)) + minBalance;

  const accountData = {
    user_id: faker.helpers.arrayElement(userIds),
    balance: balance,
    account_type: faker.finance.accountName(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  const createdAccount = await prisma.account.create({
    data: accountData,
  });

  return createdAccount;
};
