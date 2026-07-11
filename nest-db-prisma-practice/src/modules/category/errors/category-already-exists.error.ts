import { ConflictException } from '@nestjs/common';

export class CategoryAlreadyExistsError extends ConflictException {
  constructor() {
    super('Category already exists, use another name');
  }
}
