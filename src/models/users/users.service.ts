import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import logger from 'winston.config';
import * as bcrypt from 'bcrypt';
import { TransactionType, User } from '@prisma/client';
import { AuthUser } from 'src/interfaces/auth-user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private omitPassword(user: User): AuthUser {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private omitTransactionPassword(transaction: any) {
    const { transaction_password, ...transactionWithoutPassword } = transaction;
    return transactionWithoutPassword;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
      return { data: this.omitPassword(user) };
    } catch (error) {
      logger.error('Error creating user: ', error);
      throw new Error('Could not create user');
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const parsedLimit = parseInt(limit as any, 10);
      const parsedPage = parseInt(page as any, 10);

      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
        }),
        this.prisma.user.count(),
      ]);

      return {
        data: users.map(this.omitPassword),
        meta: {
          total,
          page: parsedPage,
          limit: parsedLimit,
          totalPages: Math.ceil(total / parsedLimit),
        },
      };
    } catch (error) {
      logger.error('Error fetching users: ', error);
      throw new Error('Could not fetch users');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return { data: this.omitPassword(user) };
    } catch (error) {
      logger.error(`Error fetching user with ID ${id}: `, error);
      throw new Error('Could not fetch user');
    }
  }

  async findAuthUser(id: number): Promise<AuthUser> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return this.omitPassword(user) as AuthUser;
    } catch (error) {
      logger.error(`Error fetching user with ID ${id}: `, error);
      throw new Error('Could not fetch user');
    }
  }

  async getUserTransactions(
    userId: number,
    page: number = 1,
    limit: number = 10,
    transactionType?: TransactionType,
    startDate?: Date,
    endDate?: Date,
    minAmount?: number,
    maxAmount?: number,
    period?: '7' | '15' | '30' | '90',
    sortByDate?: 'asc' | 'desc',
  ) {
    try {
      const parsedLimit = parseInt(limit as any, 10);
      const parsedPage = parseInt(page as any, 10);

      if (period) {
        const today = new Date();
        const start = new Date();
        if (period === '7') start.setDate(today.getDate() - 7);
        if (period === '15') start.setDate(today.getDate() - 15);
        if (period === '30') start.setDate(today.getDate() - 30);
        if (period === '90') start.setDate(today.getDate() - 90);

        startDate = start;
        endDate = today;
      }

      const [transactions, total] = await Promise.all([
        this.prisma.transaction.findMany({
          where: {
            account: {
              user_id: userId,
            },
            ...(transactionType && { transaction_type: transactionType }),
            ...(startDate && { transaction_date: { gte: startDate } }),
            ...(endDate && { transaction_date: { lte: endDate } }),
            ...(minAmount && { amount: { gte: minAmount } }),
            ...(maxAmount && { amount: { lte: maxAmount } }),
          },
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
          orderBy: {
            transaction_date: sortByDate ? sortByDate : 'desc',
          },
        }),
        this.prisma.transaction.count({
          where: {
            account: {
              user_id: userId,
            },
            ...(transactionType && { transaction_type: transactionType }),
            ...(startDate && { transaction_date: { gte: startDate } }),
            ...(endDate && { transaction_date: { lte: endDate } }),
            ...(minAmount && { amount: { gte: minAmount } }),
            ...(maxAmount && { amount: { lte: maxAmount } }),
          },
        }),
      ]);

      return {
        data: transactions.map(this.omitTransactionPassword),
        meta: {
          total,
          page: parsedPage,
          limit: parsedLimit,
          totalPages: Math.ceil(total / parsedLimit),
        },
      };
    } catch (error) {
      logger.error(
        `Error fetching transactions for user with ID ${userId}: `,
        error,
      );
      throw new Error('Could not fetch user transactions');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return { data: this.omitPassword(user) };
    } catch (error) {
      logger.error(`Error updating user with ID ${id}: `, error);
      throw new Error('Could not update user');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return { data: { message: `User with ID ${id} removed successfully` } };
    } catch (error) {
      logger.error(`Error removing user with ID ${id}: `, error);
      throw new Error('Could not remove user');
    }
  }
}
