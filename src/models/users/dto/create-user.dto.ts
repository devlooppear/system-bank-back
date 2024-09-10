import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'Creation date of the user', type: Date })
  @IsDate()
  readonly created_at: Date;

  @ApiProperty({ description: 'Last updated date of the user', type: Date })
  @IsDate()
  readonly updated_at: Date;
}
