import { NotFoundException } from '@nestjs/common';

export class PublisherNotFoundError extends NotFoundException {
  constructor() {
    super('Publisher not found');
  }
}
