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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly addStockUseCase: AddStockUseCase,
    private readonly withdrawStockUseCase: WithdrawStockUseCase,
  ) {}

  @Patch(':id/add')
  @ApiOperation({ summary: 'Add item stock' })
  @ApiResponse({ status: 200, description: 'Stock item added successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request or Invalid input data.',
  })
  addStock(@Param('id') id: string, @Body() quantity: StockQuantityDto) {
    return this.addStockUseCase.execute(id, quantity);
  }

  @Patch(':id/withdraw')
  @ApiOperation({ summary: 'Withdraw item' })
  @ApiResponse({
    status: 200,
    description: 'Stock items have been successfully withdrawn',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request, Invalid input data, or stock value is not enough.',
  })
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
