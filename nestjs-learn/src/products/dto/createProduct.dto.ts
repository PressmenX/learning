import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNumber()
  @IsPositive()
  stock!: number;
}
