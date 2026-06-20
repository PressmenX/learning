import {
  IsNotEmpty,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString({ message: 'The title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  name!: string;

  @IsNotEmpty()
  @IsPositive({ message: 'Stock must have a positive value' })
  @Min(0, { message: 'Invalid stock value' })
  stock!: number;
}
