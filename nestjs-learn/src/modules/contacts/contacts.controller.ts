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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './DTOs/create-contact.dto';
import { ContactLimitReachedError } from './errors/contact-limit-reached.error';
import { UpdateContactUseCase } from './use-cases/update-contact.use-case';
import { DeleteContactUseCase } from './use-cases/delete-contact.use-case';
import { ContactResponseDto } from './DTOs/contact-response.dto';

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
  @ApiOperation({ summary: 'Get all contacts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all contacts',
    type: ContactResponseDto,
  })
  getAll() {
    return this.getAllUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get contact by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns contact by id',
    type: ContactResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Contact not found',
  })
  getById(@Param('id') id: string) {
    return this.getByContactIdUseCase.execute(id);
  }

  @Post()
  @ApiOperation({ summary: 'Add new Contact' })
  @ApiResponse({
    status: 201,
    description: 'Contact created successfully',
    type: ContactResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, Invalid input data, or limit reached',
  })
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
  @ApiOperation({ summary: 'Update contact by id' })
  @ApiResponse({
    status: 200,
    description: 'Contact updated successfully',
    type: ContactResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request or invalid input',
  })
  update(@Param('id') id: string, @Body() payload: Partial<CreateContactDto>) {
    return this.updateContactUseCase.execute(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete contact by id' })
  @ApiResponse({
    status: 200,
    description: 'Contact deleted successfully',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request or invalid input',
  })
  delete(@Param('id') id: string) {
    return this.deleteContactUseCase.execute(id);
  }
}
