import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import logger from 'winston.config';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      const account = await this.prisma.account.create({
        data: createAccountDto,
      });
      return { data: account };
    } catch (error) {
      logger.error('Error creating account: ', error);
      throw new Error('Could not create account');
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const parsedLimit = parseInt(limit as any, 10);
      const parsedPage = parseInt(page as any, 10);

      const [accounts, total] = await Promise.all([
        this.prisma.account.findMany({
          skip: (parsedPage - 1) * parsedLimit,
          take: parsedLimit,
        }),
        this.prisma.account.count(),
      ]);

      return {
        data: accounts,
        meta: {
          total,
          page: parsedPage,
          limit: parsedLimit,
          totalPages: Math.ceil(total / parsedLimit),
        },
      };
    } catch (error) {
      logger.error('Error fetching accounts: ', error);
      throw new Error('Could not fetch accounts');
    }
  }

  async findOne(id: number) {
    try {
      const account = await this.prisma.account.findUnique({
        where: { id },
      });

      if (!account) {
        throw new NotFoundException(`Account with ID ${id} not found`);
      }

      return { data: account };
    } catch (error) {
      logger.error(`Error fetching account with ID ${id}: `, error);
      throw new Error('Could not fetch account');
    }
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    try {
      const account = await this.prisma.account.update({
        where: { id },
        data: updateAccountDto,
      });

      return { data: account };
    } catch (error) {
      logger.error(`Error updating account with ID ${id}: `, error);
      throw new Error('Could not update account');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.account.delete({
        where: { id },
      });

      return { message: `Account with ID ${id} removed successfully` };
    } catch (error) {
      logger.error(`Error removing account with ID ${id}: `, error);
      throw new Error('Could not remove account');
    }
  }
}
