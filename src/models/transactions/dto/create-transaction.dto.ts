import { TransactionType } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ description: 'ID da conta associada à transação' })
  @IsNotEmpty()
  account_id: number;

  @ApiProperty({ description: 'Tipo de transação (TED ou PIX)', enum: TransactionType })
  @IsEnum(TransactionType)
  transaction_type: TransactionType;

  @ApiProperty({ description: 'Valor da transação' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Data da transação' })
  @IsDate()
  transaction_date: Date;

  @ApiProperty({ description: 'CPF do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  cpf_recipient?: string;

  @ApiProperty({ description: 'CNPJ do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  cnpj_recipient?: string;

  @ApiProperty({ description: 'Nome do destinatário' })
  @IsNotEmpty()
  @IsString()
  recipient_name: string;

  @ApiProperty({ description: 'Banco do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  bank?: string;

  @ApiProperty({ description: 'Agência do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  branch?: string;

  @ApiProperty({ description: 'Conta do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  account_recipient?: string;

  @ApiProperty({ description: 'Chave PIX do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  pix_key?: string;

  @ApiProperty({ description: 'Senha da transação' })
  @IsNotEmpty()
  @IsString()
  transaction_password: string;

  @ApiProperty({ description: 'Data de criação da transação (opcional)', required: false })
  created_at?: Date;

  @ApiProperty({ description: 'Data da última atualização da transação (opcional)', required: false })
  updated_at?: Date;
}
