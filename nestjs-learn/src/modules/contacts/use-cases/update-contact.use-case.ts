import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from '../DTOs/create-contact.dto';
import { ContactsRepositoryAbstract } from '../interfaces/contacts.repository.abstract';

@Injectable()
export class UpdateContactUseCase {
  constructor(private readonly contactsRepo: ContactsRepositoryAbstract) {}

  execute(id: string, payload: Partial<CreateContactDto>) {
    const item = this.contactsRepo.update(id, payload);
    if (!item) throw new NotFoundException(`Contact with id ${id} not found`);
    return item;
  }
}
