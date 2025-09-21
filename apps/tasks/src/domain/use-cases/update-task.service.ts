import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from './base-use-case';
import { TasksRepositoryService } from '../../infrastructure/database/repositories/tasks.repository.service';
import { ITask } from '@app/common';
import { UpdateTaskDto } from '@project-manager-api/gateways/controllers/tasks/dtos/update-task.dto';

@Injectable()
export class UpdateTaskService extends BaseUseCaseImpl {
  constructor(
    
    private readonly taskRepository: TasksRepositoryService,
  ) {
    super();
  }

  async execute(payload: {
    task: UpdateTaskDto;
    userId: number;
  }): Promise<ITask> {
    await this.validateUserExists(payload.userId);
    await this.taskRepository.updateById(payload.userId, payload.task);
    return this.taskRepository.findById(payload.userId, payload.task.id);
  }
}
