import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionHistoryDto {
  @ApiProperty({ description: 'ID da transação associada ao histórico' })
  @IsNotEmpty()
  @IsNumber()
  transaction_id: number;

  @ApiProperty({ description: 'ID do usuário associado ao histórico' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ description: 'Data do movimento registrado no histórico' })
  @IsNotEmpty()
  @IsDate()
  movement_date: Date;

  @ApiProperty({
    description: 'Data de criação do histórico (opcional)',
    required: false,
  })
  @IsDate()
  created_at?: Date;

  @ApiProperty({
    description: 'Data da última atualização do histórico (opcional)',
    required: false,
  })
  @IsDate()
  updated_at?: Date;
}
