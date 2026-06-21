import { Injectable } from '@nestjs/common';
import { ContactsRepositoryAbstract } from '../interfaces/contacts.repository.abstract';
import { CreateContactDto } from '../DTOs/create-contact.dto';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';
import { ContactLimitReachedError } from '../errors/contact-limit-reached.error';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class CreateContactUseCase {
  constructor(
    private readonly contactsRepo: ContactsRepositoryAbstract,
    private readonly configService: ConfigService,
    private logger: PinoLogger,
  ) {}

  execute(payload: CreateContactDto) {
    this.logger.info(`Creating a new contact for the name ${payload.name}...`);

    const maxContact = Number(
      this.configService.get<number>('MAX_CONTACT_PER_USER'),
    );
    const totalCurrentContacts = this.contactsRepo.findAll().length;

    if (totalCurrentContacts >= maxContact) {
      this.logger.error(
        `Failed to make contact with the name ${payload.name} due to the maximum contact limit`,
      );
      throw new ContactLimitReachedError(
        'The available contact capacity has reached its limit',
      );
    }

    const newItem = {
      id: 'con-' + nanoid(),
      ...payload,
    };

    this.logger.info(
      `Successfully created a new contact with the name ${payload.name}.`,
    );
    return this.contactsRepo.save(newItem);
  }
}
