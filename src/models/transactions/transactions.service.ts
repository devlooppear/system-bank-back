import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import logger from 'winston.config';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = await this.prisma.transaction.create({
        data: createTransactionDto,
      });
      return { data: transaction };
    } catch (error) {
      logger.error('Error creating transaction: ', error);
      throw new Error('Could not create transaction');
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const parsedLimit = parseInt(limit as any, 10);
      const parsedPage = parseInt(page as any, 10);

      const [transactions, total] = await Promise.all([
        this.prisma.transaction.findMany({
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
        }),
        this.prisma.transaction.count(),
      ]);

      return {
        data: transactions,
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

      return { data: transaction };
    } catch (error) {
      logger.error(`Error fetching transaction with ID ${id}: `, error);
      throw new Error('Could not fetch transaction');
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      const transaction = await this.prisma.transaction.update({
        where: { id },
        data: updateTransactionDto,
      });

      return { data: transaction };
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
