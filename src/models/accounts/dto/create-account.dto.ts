import { IsNotEmpty, IsNumber, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '@prisma/client';

export class CreateAccountDto {
  @ApiProperty({ description: 'User ID associated with the account' })
  @IsNotEmpty()
  @IsNumber()
  readonly user_id: number;

  @ApiProperty({ description: 'Initial balance of the account' })
  @IsNotEmpty()
  @IsNumber()
  readonly balance: number;

  @ApiProperty({ description: 'Type of the account', enum: AccountType })
  @IsNotEmpty()
  @IsEnum(AccountType)
  readonly account_type: AccountType;

  @ApiProperty({ description: 'Creation date of the account', type: Date })
  @IsDate()
  readonly created_at: Date;

  @ApiProperty({ description: 'Last updated date of the account', type: Date })
  @IsDate()
  readonly updated_at: Date;
}
