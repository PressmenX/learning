import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { GetAllContactUseCase } from './use-cases/get-all-contact.use-case';
import { GetByContactIdUseCase } from './use-cases/get-by-contact-id.use-case';
import { CreateContactUseCase } from './use-cases/create-contact.use-case';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './DTOs/create-contact.dto';
import { ContactLimitReachedError } from './errors/contact-limit-reached.error';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly getAllUseCase: GetAllContactUseCase,
    private readonly getByContactIdUseCase: GetByContactIdUseCase,
    private readonly createContactUseCase: CreateContactUseCase,
  ) {}

  @Get()
  getAll() {
    return this.getAllUseCase.execute();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.getByContactIdUseCase.execute(id);
  }

  @Post()
  create(@Body() payload: CreateContactDto) {
    try {
      return this.createContactUseCase.execute(payload);
    } catch (err) {
      if (err instanceof ContactLimitReachedError) {
        throw new BadRequestException(err.message);
      }

      throw err;
    }
  }
}
