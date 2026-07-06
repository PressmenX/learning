import { ConflictException } from '@nestjs/common';

export class BookAlreadyExistsError extends ConflictException {
  constructor() {
    super('The book is available, use other book specifications.');
  }
}
