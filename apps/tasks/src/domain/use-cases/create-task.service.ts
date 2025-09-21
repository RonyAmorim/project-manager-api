import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from './base-use-case';
import { TasksRepositoryService } from '../../infrastructure/database/repositories/tasks.repository.service';
import { CreateTaskDto } from '@project-manager-api/gateways/controllers/tasks/dtos/create-task.dto';
import { ITask } from '@app/common';

@Injectable()
export class CreateTaskService extends BaseUseCaseImpl {
  constructor(
    private readonly taskRepository: TasksRepositoryService,
  ) {
    super();
  }

  async execute(payload: {
    task: CreateTaskDto;
    userId: number;
  }): Promise<ITask> {
    await this.validateUserExists(payload.userId);

    return this.taskRepository.add({
      title: payload.task.name,
      description: payload.task.description || '',
      status: payload.task.status,
      projectId: payload.task.projectId,
      userId: payload.userId,
    });
  }
}
