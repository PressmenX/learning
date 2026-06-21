import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactsRepositoryAbstract } from '../interfaces/contacts.repository.abstract';

@Injectable()
export class GetByContactIdUseCase {
  constructor(private readonly contactsRepo: ContactsRepositoryAbstract) {}

  execute(id: string) {
    const item = this.contactsRepo.findOne(id);
    if (!item) throw new NotFoundException(`Contact with id ${id} not found`);
    return item;
  }
}
