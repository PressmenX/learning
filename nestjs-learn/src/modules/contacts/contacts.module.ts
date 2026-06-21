import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsRepositoryAbstract } from './interfaces/contacts.repository.abstract';
import { MockContactsRepository } from './contacts.repository';
import { GetAllContactUseCase } from './use-cases/get-all-contact.use-case';
import { GetByContactIdUseCase } from './use-cases/get-by-contact-id.use-case';
import { CreateContactUseCase } from './use-cases/create-contact.use-case';

@Module({
  controllers: [ContactsController],
  providers: [
    {
      provide: ContactsRepositoryAbstract,
      useClass: MockContactsRepository,
    },
    GetAllContactUseCase,
    GetByContactIdUseCase,
    CreateContactUseCase,
  ],
})
export class ContactsModule {}
