import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { IInventory } from './inventory.interface';

export abstract class InventoryRepositoryAbstract {
  abstract findOne(id: string): IInventory | null;
  abstract update(
    id: string,
    changes: Partial<CreateInventoryDto>,
  ): IInventory | null;
}
