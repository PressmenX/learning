import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepositoryAbstract } from '../interfaces/inventory.repository.abstract';
import { StockQuantityDto } from '../dto/stock-quantity.dto';
import { InsufficientStockError } from '../errors/insufficient-stock.error';

@Injectable()
export class WithdrawStockUseCase {
  constructor(private readonly inventoryRepo: InventoryRepositoryAbstract) {}

  execute(id: string, payload: StockQuantityDto) {
    const item = this.inventoryRepo.findOne(id);
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    if (payload.quantity > item.stock) {
      throw new InsufficientStockError(
        'Stock failed to be withdrawn because the quantity was insufficient.',
      );
    }
    const updatedStock = item.stock - payload.quantity;
    return this.inventoryRepo.update(id, { stock: updatedStock });
  }
}
