import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { TransactionHistoriesService } from './transaction-histories.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('transaction-histories')
export class TransactionHistoriesController {
  constructor(
    private readonly transactionHistoriesService: TransactionHistoriesService,
  ) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.transactionHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionHistoriesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionHistoriesService.remove(+id);
  }
}
