import { IsOptional, IsNumber, IsDate, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class UpdateTransactionDto {
  @ApiProperty({ description: 'ID da conta associada à transação', required: false })
  @IsOptional()
  @IsNumber()
  readonly account_id?: number;

  @ApiProperty({
    description: 'Tipo de transação (TED ou PIX)',
    enum: TransactionType,
    required: false,
  })
  @IsOptional()
  @IsEnum(TransactionType)
  readonly transaction_type?: TransactionType;

  @ApiProperty({ description: 'Valor da transação', required: false })
  @IsOptional()
  @IsNumber()
  readonly amount?: number;

  @ApiProperty({ description: 'Data da transação', required: false })
  @IsOptional()
  @IsDate()
  readonly transaction_date?: Date;

  @ApiProperty({ description: 'CPF do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  readonly cpf_recipient?: string;

  @ApiProperty({ description: 'CNPJ do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  readonly cnpj_recipient?: string;

  @ApiProperty({ description: 'Nome do destinatário' })
  @IsOptional()
  @IsString()
  readonly recipient_name?: string;

  @ApiProperty({ description: 'Banco do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  readonly bank?: string;

  @ApiProperty({ description: 'Agência do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  readonly branch?: string;

  @ApiProperty({ description: 'Conta do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  readonly account_recipient?: string;

  @ApiProperty({ description: 'Chave PIX do destinatário (opcional)', required: false })
  @IsOptional()
  @IsString()
  readonly pix_key?: string;

  @ApiProperty({ description: 'Senha da transação' })
  @IsOptional()
  @IsString()
  readonly transaction_password?: string;

  @ApiProperty({ description: 'Data de criação da transação (opcional)', required: false })
  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @ApiProperty({ description: 'Data da última atualização da transação (opcional)', required: false })
  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
