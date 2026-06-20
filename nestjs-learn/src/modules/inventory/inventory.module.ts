import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryRepositoryAbstract } from './interfaces/inventory.repository.abstract';
import { MockInventoryRepository } from './invetory.repository';
import { AddStockUseCase } from './use-cases/add-stock.use-case';
import { WithdrawStockUseCase } from './use-cases/withdraw-stock.use-case';

@Module({
  controllers: [InventoryController],
  providers: [
    {
      provide: InventoryRepositoryAbstract,
      useClass: MockInventoryRepository,
    },
    AddStockUseCase,
    WithdrawStockUseCase,
  ],
})
export class InventoryModule {}
