import { NotFoundException } from '@nestjs/common';

export class MemberNotFoundError extends NotFoundException {
  constructor() {
    super('Member not found');
  }
}
