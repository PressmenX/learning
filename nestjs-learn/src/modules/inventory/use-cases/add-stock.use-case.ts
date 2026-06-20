import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepositoryAbstract } from '../interfaces/inventory.repository.abstract';
import { StockQuantityDto } from '../dto/stock-quantity.dto';

@Injectable()
export class AddStockUseCase {
  constructor(private readonly inventoryRepo: InventoryRepositoryAbstract) {}

  execute(id: string, payload: StockQuantityDto) {
    const item = this.inventoryRepo.findOne(id);
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    const updatedStock = item.stock + payload.quantity;
    return this.inventoryRepo.update(id, { stock: updatedStock });
  }
}
