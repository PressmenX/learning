import { TaskPriority } from '../enums/task-priority.enum';

export interface ITasks {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
}
