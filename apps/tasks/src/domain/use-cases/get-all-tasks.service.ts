import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from './base-use-case';
import { ITask } from '@app/common';
import { TasksRepositoryService } from '../../infrastructure/database/repositories/tasks.repository.service';

@Injectable()
export class GetAllTasksService extends BaseUseCaseImpl {
  constructor(
    
    private readonly taskRepository: TasksRepositoryService,
  ) {
    super();
  }

  async execute(userId: number): Promise<ITask[]> {
    await this.validateUserExists(userId);
    return this.taskRepository.findAll(userId);
  }
}
