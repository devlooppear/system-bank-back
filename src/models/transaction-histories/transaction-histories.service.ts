import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction-history.dto';
import logger from 'winston.config';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TransactionHistoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTransactionHistoryDto: CreateTransactionHistoryDto) {
    try {
      const transactionHistory = await this.prisma.transactionHistory.create({
        data: createTransactionHistoryDto,
      });
      return { data: transactionHistory };
    } catch (error) {
      logger.error('Error creating transaction history: ', error);
      throw new Error('Could not create transaction history');
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const parsedLimit = parseInt(limit as any, 10);
      const parsedPage = parseInt(page as any, 10);

      const [transactionHistories, total] = await Promise.all([
        this.prisma.transactionHistory.findMany({
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
        }),
        this.prisma.transactionHistory.count(),
      ]);

      return {
        data: transactionHistories,
        meta: {
          total,
          page: parsedPage,
          limit: parsedLimit,
          totalPages: Math.ceil(total / parsedLimit),
        },
      };
    } catch (error) {
      logger.error('Error fetching transaction histories: ', error);
      throw new Error('Could not fetch transaction histories');
    }
  }

  async findOne(id: number) {
    try {
      const transactionHistory =
        await this.prisma.transactionHistory.findUnique({
          where: { id },
        });

      if (!transactionHistory) {
        throw new NotFoundException(
          `Transaction History with ID ${id} not found`,
        );
      }

      return { data: transactionHistory };
    } catch (error) {
      logger.error(`Error fetching transaction history with ID ${id}: `, error);
      throw new Error('Could not fetch transaction history');
    }
  }

  async update(
    id: number,
    updateTransactionHistoryDto: UpdateTransactionHistoryDto,
  ) {
    try {
      const transactionHistory = await this.prisma.transactionHistory.update({
        where: { id },
        data: updateTransactionHistoryDto,
      });

      return { data: transactionHistory };
    } catch (error) {
      logger.error(`Error updating transaction history with ID ${id}: `, error);
      throw new Error('Could not update transaction history');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.transactionHistory.delete({
        where: { id },
      });

      return {
        message: `Transaction History with ID ${id} removed successfully`,
      };
    } catch (error) {
      logger.error(`Error removing transaction history with ID ${id}: `, error);
      throw new Error('Could not remove transaction history');
    }
  }
}
