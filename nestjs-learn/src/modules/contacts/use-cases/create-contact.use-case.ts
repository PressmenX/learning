import { Injectable } from '@nestjs/common';
import { ContactsRepositoryAbstract } from '../interfaces/contacts.repository.abstract';
import { CreateContactDto } from '../DTOs/create-contact.dto';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';
import { ContactLimitReachedError } from '../errors/contact-limit-reached.error';

@Injectable()
export class CreateContactUseCase {
  constructor(
    private readonly contactsRepo: ContactsRepositoryAbstract,
    private readonly configService: ConfigService,
  ) {}

  execute(payload: CreateContactDto) {
    const maxContact = Number(
      this.configService.get<number>('MAX_CONTACT_PER_USER'),
    );
    const totalCurrentContacts = this.contactsRepo.findAll().length;

    if (totalCurrentContacts >= maxContact) {
      throw new ContactLimitReachedError(
        'The available contact capacity has reached its limit',
      );
    }

    const newItem = {
      id: 'con-' + nanoid(),
      ...payload,
    };
    return this.contactsRepo.save(newItem);
  }
}
