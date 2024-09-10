import { PrismaClient, Transaction, TransactionType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const SALT_ROUNDS = 10;
const BANK_LIST = [
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

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateAccountNumber = (): string => {
  return generateRandomNumber(10000000000, 99999999999).toString();
};

const generateBranchNumber = (): string => {
  return generateRandomNumber(1000, 9999).toString();
};

const generateCPF = (): string => {
  return generateRandomNumber(10000000000, 99999999999).toString();
};

const generateCNPJ = (): string => {
  return generateRandomNumber(10000000000000, 99999999999999).toString();
};

export const transactionFactory = async (prisma: PrismaClient): Promise<Transaction> => {
  const accounts = await prisma.account.findMany();
  const accountIds = accounts.map(account => account.id);

  const amount = parseFloat((Math.random() * (1000 - 1) + 1).toFixed(2));
  const useCNPJ = Math.random() < 0.5;

  const cpf_recipient = useCNPJ ? null : generateCPF();
  const cnpj_recipient = useCNPJ ? generateCNPJ() : null;

  const transactionPassword = faker.internet.password();
  const hashedPassword = await bcrypt.hash(transactionPassword, SALT_ROUNDS);

  const transactionData = {
    account_id: faker.helpers.arrayElement(accountIds),
    transaction_type: faker.helpers.arrayElement(Object.values(TransactionType)),
    amount,
    transaction_date: new Date(),
    cpf_recipient,
    cnpj_recipient,
    recipient_name: faker.person.fullName(),
    bank: faker.helpers.arrayElement(BANK_LIST),
    branch: generateBranchNumber(),
    account_recipient: generateAccountNumber(),
    pix_key: uuidv4(),
    transaction_password: hashedPassword,
  };

  return await prisma.transaction.create({ data: transactionData });
};
