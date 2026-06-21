import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GetAllContactUseCase } from './use-cases/get-all-contact.use-case';
import { GetByContactIdUseCase } from './use-cases/get-by-contact-id.use-case';
import { CreateContactUseCase } from './use-cases/create-contact.use-case';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './DTOs/create-contact.dto';
import { ContactLimitReachedError } from './errors/contact-limit-reached.error';
import { UpdateContactUseCase } from './use-cases/update-contact.use-case';
import { DeleteContactUseCase } from './use-cases/delete-contact.use-case';

@ApiTags('contacts')
@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly getAllUseCase: GetAllContactUseCase,
    private readonly getByContactIdUseCase: GetByContactIdUseCase,
    private readonly createContactUseCase: CreateContactUseCase,
    private readonly updateContactUseCase: UpdateContactUseCase,
    private readonly deleteContactUseCase: DeleteContactUseCase,
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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: Partial<CreateContactDto>) {
    return this.updateContactUseCase.execute(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteContactUseCase.execute(id);
  }
}
