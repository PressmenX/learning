import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({
    example: 'Milk',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString({ message: 'The title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  name!: string;

  @ApiProperty({
    example: 4,
    minimum: 1,
  })
  @IsInt({ message: 'Stock must be a whole number' })
  @IsPositive({ message: 'Stock must have a positive value' })
  stock!: number;
}
