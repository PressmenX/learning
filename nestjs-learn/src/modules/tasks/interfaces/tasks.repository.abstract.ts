import { CreateTaskDTO } from '../dto/create-task.dto';

export abstract class TaskRepositoryAbstract {
  abstract save(payload: CreateTaskDTO): CreateTaskDTO;
}
