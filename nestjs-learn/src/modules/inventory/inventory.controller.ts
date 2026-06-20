import { Body, Controller, Param, Patch } from '@nestjs/common';
import { AddStockUseCase } from './use-cases/add-stock.use-case';
import { StockQuantityDto } from './dto/stock-quantity.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly addStockUseCase: AddStockUseCase) {}

  @Patch('add/:id')
  addStock(@Param('id') id: string, @Body() quantity: StockQuantityDto) {
    return this.addStockUseCase.execute(id, quantity);
  }
}
