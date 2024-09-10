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
import { TransactionHistoriesService } from './transaction-histories.service';
import { CreateTransactionHistoryDto } from './dto/create-transaction-history.dto';
import { UpdateTransactionHistoryDto } from './dto/update-transaction-history.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('transaction-histories')
export class TransactionHistoriesController {
  constructor(
    private readonly transactionHistoriesService: TransactionHistoriesService,
  ) {}

  @Post()
  create(@Body() createTransactionHistoryDto: CreateTransactionHistoryDto) {
    return this.transactionHistoriesService.create(createTransactionHistoryDto);
  }

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionHistoryDto: UpdateTransactionHistoryDto,
  ) {
    return this.transactionHistoriesService.update(
      +id,
      updateTransactionHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionHistoriesService.remove(+id);
  }
}
