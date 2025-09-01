import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from '../base-use-case';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { CreateTaskDto } from 'src/gateways/controllers/tasks/dtos/create-task.dto';
import { ITask } from 'src/domain/interfaces/task.interface';

@Injectable()
export class CreateTaskService extends BaseUseCaseImpl {
  constructor(
    userRepository: UsersRepositoryService,
    private readonly projectRepository: ProjectsRepositoryService,
    private readonly taskRepository: TasksRepositoryService,
  ) {
    super(userRepository);
  }

  async execute(payload: {
    task: CreateTaskDto;
    userId: number;
  }): Promise<ITask> {
    await this.validateUserExists(payload.userId);
    
    return this.taskRepository.add({
      name: payload.task.name,
      status: payload.task.status,
      project: {
        id: payload.task.projectId,
      },
      user: {
        id: payload.userId,
      },
    });
  }
}
