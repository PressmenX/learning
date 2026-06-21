import { IContact } from './interfaces/contact.interface';
import { ContactsRepositoryAbstract } from './interfaces/contacts.repository.abstract';

export class MockContactsRepository implements ContactsRepositoryAbstract {
  private contacts: IContact[] = [];

  findAll(): IContact[] {
    return this.contacts;
  }

  findOne(id: string): IContact | null {
    const item = this.contacts.find((i) => i.id === id);
    if (!item) return null;
    return item;
  }

  save(item: IContact): IContact {
    this.contacts.push(item);
    return item;
  }

  update(id: string, changes: Partial<Omit<IContact, 'id'>>): IContact | null {
    const index = this.contacts.findIndex((i) => i.id === id);
    if (index === -1) return null;

    const existingItem = this.contacts[index];
    this.contacts[index] = {
      ...existingItem,
      ...changes,
      id,
    };

    return this.contacts[index];
  }

  remove(id: string): boolean {
    const index = this.contacts.findIndex((i) => i.id === id);
    if (index === -1) return false;

    this.contacts.splice(index, 1);
    return true;
  }
}
