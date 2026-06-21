import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe', minLength: 3 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  name!: string;

  @ApiProperty({ example: '+6281234567890' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phoneNumber!: string;

  @ApiProperty({ example: 'personal' })
  @IsNotEmpty()
  @IsString()
  label!: string;
}
