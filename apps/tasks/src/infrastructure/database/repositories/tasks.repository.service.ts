import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { TaskEntity, ITask } from '@app/common';
import { ITaskRepository } from '../../../domain/repositories/tasks-repository.interface';

@Injectable()
export class TasksRepositoryService
  extends Repository<TaskEntity>
  implements ITaskRepository
{
  constructor(dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  findAll(userId: number): Promise<ITask[]> {
    return this.findBy({ user: { id: userId } });
  }
  findById(userId: number, id: number): Promise<ITask> {
    return this.findOneByOrFail({ id, user: { id: userId } });
  }
  add(payload: DeepPartial<ITask>): Promise<ITask> {
    return this.save(payload) as Promise<ITask>;
  }
  async updateById(userId: number, payload: DeepPartial<ITask>): Promise<void> {
    if (!payload.id) {
      throw new Error('Payload must have a valid id');
    }
    await this.update(payload.id, { ...payload, userId });
  }
}
