import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundError extends NotFoundException {
  constructor() {
    super('Category not found');
  }
}
