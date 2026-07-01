import { IUser } from './user.interface';

export abstract class UserRepositoryAbstract {
  abstract findAll(): Promise<IUser[]>;
}
