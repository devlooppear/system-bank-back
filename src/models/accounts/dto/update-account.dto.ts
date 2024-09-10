import { IsOptional, IsNumber, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '@prisma/client';

export class UpdateAccountDto {
  @ApiProperty({ description: 'Balance of the account', required: false })
  @IsOptional()
  @IsNumber()
  readonly balance?: number;

  @ApiProperty({
    description: 'Type of the account',
    enum: AccountType,
    required: false,
  })
  @IsOptional()
  @IsEnum(AccountType)
  readonly account_type?: AccountType;
  @ApiProperty({
    description: 'Creation date of the account',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @ApiProperty({
    description: 'Last updated date of the account',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
