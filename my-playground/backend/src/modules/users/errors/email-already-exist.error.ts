import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistError extends HttpException {
  constructor() {
    super('Email is already in use.', HttpStatus.CONFLICT);
  }
}
