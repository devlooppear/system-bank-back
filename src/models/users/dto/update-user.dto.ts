import { IsOptional, IsString, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Name of the user', required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ description: 'Email of the user', required: false })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ description: 'Password of the user', required: false })
  @IsOptional()
  @IsString()
  readonly password?: string;

  @ApiProperty({
    description: 'Creation date of the user',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  readonly created_at?: Date;

  @ApiProperty({
    description: 'Last updated date of the user',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  readonly updated_at?: Date;
}
