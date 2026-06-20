import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class StockQuantityDto {
  @ApiProperty({
    example: 4,
    minimum: 1,
  })
  @IsInt({ message: 'Quantity must be a whole number' })
  @IsPositive({ message: 'Quantity must have a positive value' })
  quantity!: number;
}
