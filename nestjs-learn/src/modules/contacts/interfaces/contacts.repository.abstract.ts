import { IContact } from './contact.interface';

export abstract class ContactsRepositoryAbstract {
  abstract findAll(): IContact[];
  abstract findOne(id: string): IContact | null;
  abstract save(item: IContact): IContact;
  abstract update(
    id: string,
    changes: Partial<Omit<IContact, 'id'>>,
  ): IContact | null;
  abstract remove(id: string): boolean;
}
