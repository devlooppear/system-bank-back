import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreateTransactionHistoryDto } from '../transaction-histories/dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from '../transaction-histories/dto/update-transaction-history.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Body() createTransactionHistoryDto: CreateTransactionHistoryDto,
  ) {
    return this.transactionsService.create(
      createTransactionDto,
      createTransactionHistoryDto,
    );
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.transactionsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Body() updateTransactionHistoryDto: UpdateTransactionHistoryDto,
  ) {
    return this.transactionsService.update(
      +id,
      updateTransactionDto,
      updateTransactionHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
