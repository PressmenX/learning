import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepositoryAbstract } from '../interfaces/inventory.repository.abstract';
import { StockQuantityDto } from '../dto/stock-quantity.dto';
import { InsufficientStockError } from '../errors/insufficient-stock.error';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class WithdrawStockUseCase {
  constructor(
    private readonly inventoryRepo: InventoryRepositoryAbstract,

    @InjectPinoLogger(WithdrawStockUseCase.name)
    private readonly logger: PinoLogger,
  ) {}

  execute(id: string, payload: StockQuantityDto) {
    const item = this.inventoryRepo.findOne(id);
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);

    if (payload.quantity > item.stock) {
      this.logger.error('Insufficient stock');
      throw new InsufficientStockError(
        'Stock failed to be withdrawn because the quantity was insufficient.',
      );
    }
    const updatedStock = item.stock - payload.quantity;

    this.logger.info('Successfully withdrew stock items');
    return this.inventoryRepo.update(id, { stock: updatedStock });
  }
}
