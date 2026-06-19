import { ITasks } from './tasks.interface';

export abstract class TaskRepositoryAbstract {
  abstract save(payload: ITasks): ITasks;
  abstract remove(id: string): boolean;
}
