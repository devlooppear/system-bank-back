import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import logger from 'winston.config';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  private omitTransactionPassword(transaction: any) {
    const { transaction_password, ...transactionWithoutPassword } = transaction;
    return transactionWithoutPassword;
  }

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    try {
      const account = await this.prisma.account.findFirst({
        where: { user_id: userId },
      });

      if (!account) {
        throw new Error('Account not found for the user');
      }

      const transaction = await this.prisma.transaction.create({
        data: {
          account_id: account.id,
          transaction_type: createTransactionDto.transaction_type,
          amount: createTransactionDto.amount,
          transaction_date: createTransactionDto.transaction_date,
          cpf_recipient: createTransactionDto.cpf_recipient,
          cnpj_recipient: createTransactionDto.cnpj_recipient,
          recipient_name: createTransactionDto.recipient_name,
          bank: createTransactionDto.bank,
          branch: createTransactionDto.branch,
          account_recipient: createTransactionDto.account_recipient,
          pix_key: createTransactionDto.pix_key,
          transaction_password: createTransactionDto.transaction_password,
          transactionHistory: {
            create: {
              user_id: userId,
              movement_date: new Date(),
            },
          },
        },
      });

      return { data: this.omitTransactionPassword(transaction) };
    } catch (error) {
      logger.error('Error creating transaction: ', error);
      throw new Error('Could not create transaction');
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    filters: any = {},
    sortBy: string = 'transaction_date',
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    try {
      const parsedLimit = parseInt(limit as any, 10);
      const parsedPage = parseInt(page as any, 10);
      const whereConditions: any = {};

      if (filters.transaction_type) {
        whereConditions.transaction_type = filters.transaction_type;
      }
      if (filters.startDate && filters.endDate) {
        whereConditions.transaction_date = {
          gte: new Date(filters.startDate),
          lte: new Date(filters.endDate),
        };
      }
      if (filters.minAmount && filters.maxAmount) {
        whereConditions.amount = {
          gte: filters.minAmount,
          lte: filters.maxAmount,
        };
      }

      if (filters.user_id) {
        whereConditions.transactionHistory = {
          some: {
            user_id: filters.user_id,
          },
        };
      }

      const [transactions, total] = await Promise.all([
        this.prisma.transaction.findMany({
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
          where: whereConditions,
          orderBy: {
            [sortBy]: sortOrder,
          },
          include: {
            transactionHistory: {
              include: {
                user: true,
              },
            },
          },
        }),
        this.prisma.transaction.count({
          where: whereConditions,
        }),
      ]);

      return {
        data: transactions.map((transaction) => {
          return {
            ...this.omitTransactionPassword(transaction),
            transactionHistory: transaction.transactionHistory.map(
              (history) => ({
                id: history.id,
                user_id: history.user_id,
                movement_date: history.movement_date,
                user: {
                  id: history.user.id,
                  name: history.user.name,
                  email: history.user.email,
                },
              }),
            ),
          };
        }),
        meta: {
          total,
          page: parsedPage,
          limit: parsedLimit,
          totalPages: Math.ceil(total / parsedLimit),
        },
      };
    } catch (error) {
      logger.error('Error fetching transactions: ', error);
      throw new Error('Could not fetch transactions');
    }
  }

  async findOne(id: number) {
    try {
      const transaction = await this.prisma.transaction.findUnique({
        where: { id },
      });

      if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      return { data: this.omitTransactionPassword(transaction) };
    } catch (error) {
      logger.error(`Error fetching transaction with ID ${id}: `, error);
      throw new Error('Could not fetch transaction');
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      const transaction = await this.prisma.transaction.findUnique({
        where: { id },
        include: { account: { include: { user: true } } },
      });

      if (!transaction) {
        throw new NotFoundException(`Transaction with ID ${id} not found`);
      }

      const updatedTransaction = await this.prisma.transaction.update({
        where: { id },
        data: {
          ...updateTransactionDto,
          transactionHistory: {
            create: {
              user_id: transaction.account.user.id,
              movement_date: new Date(),
            },
          },
        },
      });

      return { data: this.omitTransactionPassword(updatedTransaction) };
    } catch (error) {
      logger.error(`Error updating transaction with ID ${id}: `, error);
      throw new Error('Could not update transaction');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.transaction.delete({
        where: { id },
      });

      return { message: `Transaction with ID ${id} removed successfully` };
    } catch (error) {
      logger.error(`Error removing transaction with ID ${id}: `, error);
      throw new Error('Could not remove transaction');
    }
  }
}
