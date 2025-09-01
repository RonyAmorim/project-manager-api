import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from '../base-use-case';
import { ITask } from 'src/domain/interfaces/task.interface';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetTaskByIdService extends BaseUseCaseImpl {
  constructor(
    userRepository: UsersRepositoryService,
    private readonly taskRepository: TasksRepositoryService,
  ) {
    super(userRepository);
  }

  async execute(payload: { userId: number; taskId: number }): Promise<ITask> {
    await this.validateUserExists(payload.userId);
    return this.taskRepository.findById(payload.userId, payload.taskId);
  }
}
