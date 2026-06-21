import { Injectable } from '@nestjs/common';
import { ContactsRepositoryAbstract } from '../interfaces/contacts.repository.abstract';

@Injectable()
export class GetAllContactUseCase {
  constructor(private readonly contactsRepo: ContactsRepositoryAbstract) {}

  execute() {
    return this.contactsRepo.findAll();
  }
}
