import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryRepositoryAbstract } from './interfaces/inventory.repository.abstract';
import { MockInvetoryRepository } from './invetory.repository';
import { AddStockUseCase } from './use-cases/add-stock.use-case';

@Module({
  controllers: [InventoryController],
  providers: [
    {
      provide: InventoryRepositoryAbstract,
      useClass: MockInvetoryRepository,
    },
    AddStockUseCase,
  ],
})
export class InventoryModule {}
