import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from '@/modules/book/dto/create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
