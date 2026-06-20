import { IsInt, IsPositive } from 'class-validator';

export class StockQuantityDto {
  @IsInt({ message: 'Quantity must be a whole number' })
  @IsPositive({ message: 'Quantity must have a positive value' })
  quantity!: number;
}
