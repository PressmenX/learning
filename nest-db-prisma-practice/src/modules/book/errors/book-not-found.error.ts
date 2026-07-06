import { NotFoundException } from '@nestjs/common';

export class BookNotFoundError extends NotFoundException {
  constructor() {
    super('Book not found');
  }
}
