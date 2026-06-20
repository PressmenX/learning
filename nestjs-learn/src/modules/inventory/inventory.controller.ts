import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
} from '@nestjs/common';
import { AddStockUseCase } from './use-cases/add-stock.use-case';
import { StockQuantityDto } from './dto/stock-quantity.dto';
import { WithdrawStockUseCase } from './use-cases/withdraw-stock.use-case';
import { InsufficientStockError } from './errors/insufficient-stock.error';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly addStockUseCase: AddStockUseCase,
    private readonly withdrawStockUseCase: WithdrawStockUseCase,
  ) {}

  @Patch(':id/add')
  addStock(@Param('id') id: string, @Body() quantity: StockQuantityDto) {
    return this.addStockUseCase.execute(id, quantity);
  }

  @Patch(':id/withdraw')
  withdrawStock(@Param('id') id: string, @Body() quantity: StockQuantityDto) {
    try {
      return this.withdrawStockUseCase.execute(id, quantity);
    } catch (err) {
      if (err instanceof InsufficientStockError) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }
}
