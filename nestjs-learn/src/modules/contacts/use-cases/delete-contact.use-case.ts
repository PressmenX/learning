import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactsRepositoryAbstract } from '../interfaces/contacts.repository.abstract';

@Injectable()
export class DeleteContactUseCase {
  constructor(private readonly contactsRepo: ContactsRepositoryAbstract) {}

  execute(id: string) {
    const exist = this.contactsRepo.remove(id);
    if (!exist) throw new NotFoundException(`Contact with id ${id} not found`);
    return exist;
  }
}
