import { Injectable } from '@nestjs/common';
import { ContactsRepositoryAbstract } from '../interfaces/contacts.repository.abstract';
import { CreateContactDto } from '../DTOs/create-contact.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class CreateContactUseCase {
  constructor(private readonly contactsRepo: ContactsRepositoryAbstract) {}

  execute(payload: CreateContactDto) {
    const newItem = {
      id: 'con-' + nanoid(),
      ...payload,
    };
    return this.contactsRepo.save(newItem);
  }
}
