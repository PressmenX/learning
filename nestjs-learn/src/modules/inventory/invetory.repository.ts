import { CreateInventoryDto } from './dto/create-inventory.dto';
import { IInventory } from './interfaces/inventory.interface';
import { InventoryRepositoryAbstract } from './interfaces/inventory.repository.abstract';

export class MockInvetoryRepository implements InventoryRepositoryAbstract {
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
    const item = this.inventories.find((i) => i.id === id);
    if (!item) return null;

    const updatedItem = {
      ...item,
      ...changes,
      id,
    };

    return updatedItem;
  }
}
