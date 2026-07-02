import { CreateUserDto } from '../DTOs/create-user.dto';
import { IUser } from './user.interface';

export abstract class UserRepositoryAbstract {
  abstract findAll(): Promise<IUser[]>;
  abstract save(payload: CreateUserDto): Promise<IUser>;
}
