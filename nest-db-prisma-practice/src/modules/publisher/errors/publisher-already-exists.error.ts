import { ConflictException } from '@nestjs/common';

export class PublisherAlreadyExistsError extends ConflictException {
  constructor() {
    super('A publisher with this name already exists, use another name.');
  }
}
