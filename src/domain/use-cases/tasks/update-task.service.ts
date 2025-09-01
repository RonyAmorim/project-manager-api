import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from '../base-use-case';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ITask } from 'src/domain/interfaces/task.interface';
import { UpdateTaskDto } from 'src/gateways/controllers/tasks/dtos/update-task.dto';

@Injectable()
export class UpdateTaskService extends BaseUseCaseImpl {
  constructor(
    userRepository: UsersRepositoryService,
    private readonly taskRepository: TasksRepositoryService,
  ) {
    super(userRepository);
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
