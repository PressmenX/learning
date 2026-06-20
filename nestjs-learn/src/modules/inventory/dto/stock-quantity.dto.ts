import { IsNotEmpty, IsPositive, Min } from 'class-validator';

export class StockQuantityDto {
  @IsNotEmpty()
  @IsPositive({ message: 'Stock must have a positive value' })
  @Min(0, { message: 'Invalid stock value' })
  quantity!: number;
}
