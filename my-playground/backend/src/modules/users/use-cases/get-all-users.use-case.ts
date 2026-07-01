import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from '../interfaces/user.repository.abstract';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryAbstract) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
