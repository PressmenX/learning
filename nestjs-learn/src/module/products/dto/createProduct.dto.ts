import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({
    example: 'Milk',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name!: string;

  @ApiProperty({
    example: 6000,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({
    example: 6,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  stock!: number;
}
