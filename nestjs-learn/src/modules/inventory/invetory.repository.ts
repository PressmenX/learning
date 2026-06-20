import { CreateInventoryDto } from './dto/create-inventory.dto';
import { IInventory } from './interfaces/inventory.interface';
import { InventoryRepositoryAbstract } from './interfaces/inventory.repository.abstract';

export class MockInventoryRepository implements InventoryRepositoryAbstract {
  private inventories: IInventory[] = [
    { id: 'i-a1', name: 'Milk', stock: 12 },
    { id: 'i-a2', name: 'Coffe', stock: 4 },
  ];

  findOne(id: string): IInventory | null {
    const item = this.inventories.find((i) => i.id === id);
    if (!item) return null;
    return item;
  }

  update(id: string, changes: Partial<CreateInventoryDto>): IInventory | null {
    const index = this.inventories.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const existingitem = this.inventories[index];
    this.inventories[index] = {
      ...existingitem,
      ...changes,
      id,
    };

    return this.inventories[index];
  }
}
