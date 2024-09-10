import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionHistoriesService } from './transaction-histories.service';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction-history.dto';

@Controller('transaction-histories')
export class TransactionHistoriesController {
  constructor(private readonly transactionHistoriesService: TransactionHistoriesService) {}

  @Post()
  create(@Body() createTransactionHistoryDto: CreateTransactionHistoryDto) {
    return this.transactionHistoriesService.create(createTransactionHistoryDto);
  }

  @Get()
  findAll() {
    return this.transactionHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionHistoryDto: UpdateTransactionHistoryDto) {
    return this.transactionHistoriesService.update(+id, updateTransactionHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionHistoriesService.remove(+id);
  }
}
