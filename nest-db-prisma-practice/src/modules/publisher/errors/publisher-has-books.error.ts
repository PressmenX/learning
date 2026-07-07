import { BadRequestException } from '@nestjs/common';

export class PublisherHasBooksError extends BadRequestException {
  constructor() {
    super('Cannot delete publisher as it still has books listed.');
  }
}
