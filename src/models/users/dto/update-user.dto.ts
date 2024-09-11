import { IsOptional, IsString, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Name of the user', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Email of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Password of the user', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'Creation date of the user',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  created_at?: Date;

  @ApiProperty({
    description: 'Last updated date of the user',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  updated_at?: Date;
}
