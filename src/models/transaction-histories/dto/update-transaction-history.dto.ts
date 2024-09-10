import { IsOptional, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionHistoryDto {
  @ApiProperty({ description: 'ID da transação associada ao histórico (opcional)', required: false })
  @IsOptional()
  @IsNumber()
  transaction_id?: number;

  @ApiProperty({ description: 'ID do usuário associado ao histórico (opcional)', required: false })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ description: 'Data do movimento registrado no histórico (opcional)', required: false })
  @IsOptional()
  @IsDate()
  movement_date?: Date;

  @ApiProperty({ description: 'Data de criação do histórico (opcional)', required: false })
  @IsOptional()
  @IsDate()
  created_at?: Date;

  @ApiProperty({ description: 'Data da última atualização do histórico (opcional)', required: false })
  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
