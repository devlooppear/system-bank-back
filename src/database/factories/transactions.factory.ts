import { PrismaClient, Transaction, TransactionType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 10;

const bankList = [
  'Banco Aurora',
  'Luminis',
  'Brasil Nexa',
  'Zenith',
  'Banco Futura',
  'Bancria',
  'Banco Vortex',
  'New Era',
  'Safra Unida Banks',
  'HSBC Inova',
];

const generateAccountNumber = (): string => {
  const num = Math.floor(Math.random() * 90000000000) + 10000000000;
  return num.toString();
};

const generateBranchNumber = (): string => {
  const num = Math.floor(Math.random() * 9000) + 1000;
  return num.toString();
};

export const transactionFactory = async (
  prisma: PrismaClient,
  accountIds: number[],
): Promise<Transaction> => {
  const amount = Math.random() * (1000 - 1) + 1;

  const useCNPJ = Math.random() < 0.5;

  const generateCPF = (): string => {
    const num = Math.floor(Math.random() * 90000000000) + 10000000000;
    return num.toString();
  };

  const generateCNPJ = (): string => {
    const num = Math.floor(Math.random() * 90000000000000) + 10000000000000;
    return num.toString();
  };

  const cpf_recipient: string | null = useCNPJ ? null : generateCPF();
  const cnpj_recipient: string | null = useCNPJ ? generateCNPJ() : null;

  const transactionPassword = faker.internet.password();
  const hashedPassword = await bcrypt.hash(transactionPassword, SALT_ROUNDS);

  const transactionData: Omit<Transaction, 'id' | 'created_at' | 'updated_at'> =
    {
      account_id: faker.helpers.arrayElement(accountIds),
      transaction_type: faker.helpers.arrayElement(
        Object.values(TransactionType),
      ),
      amount: parseFloat(amount.toFixed(2)),
      transaction_date: new Date(),
      cpf_recipient,
      cnpj_recipient,
      recipient_name: faker.person.fullName(),
      bank: faker.helpers.arrayElement(bankList),
      branch: generateBranchNumber(),
      account_recipient: generateAccountNumber(),
      pix_key: uuidv4(),
      transaction_password: hashedPassword,
    };

  const createdTransaction = await prisma.transaction.create({
    data: transactionData,
  });

  return createdTransaction;
};
