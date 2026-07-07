import { ConflictException } from '@nestjs/common';

export class MemberAlreadyExistsError extends ConflictException {
  constructor() {
    super('Member already exists, use another email.');
  }
}
