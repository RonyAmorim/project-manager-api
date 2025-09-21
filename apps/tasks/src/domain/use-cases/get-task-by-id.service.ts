import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from './base-use-case';
import { ITask } from '@app/common';
import { TasksRepositoryService } from '../../infrastructure/database/repositories/tasks.repository.service';

@Injectable()
export class GetTaskByIdService extends BaseUseCaseImpl {
  constructor(
    
    private readonly taskRepository: TasksRepositoryService,
  ) {
    super();
  }

  async execute(payload: { userId: number; taskId: number }): Promise<ITask> {
    await this.validateUserExists(payload.userId);
    return this.taskRepository.findById(payload.userId, payload.taskId);
  }
}
