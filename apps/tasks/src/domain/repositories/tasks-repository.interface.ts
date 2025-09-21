import { DeepPartial } from 'typeorm';
import { ITask } from '@app/common';

export interface ITaskRepository {
  findAll(userId: number): Promise<ITask[]>;
  findById(userId: number, id: number): Promise<ITask>;
  add(payload: DeepPartial<ITask>): Promise<ITask>;
  updateById(userId: number, payload: DeepPartial<ITask>): Promise<void>;
}
