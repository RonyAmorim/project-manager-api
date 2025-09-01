import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from '../base-use-case';
import { ITask } from 'src/domain/interfaces/task.interface';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetAllTasksService extends BaseUseCaseImpl {
  constructor(
    userRepository: UsersRepositoryService,
    private readonly taskRepository: TasksRepositoryService,
  ) {
    super(userRepository);
  }

  async execute(userId: number): Promise<ITask[]> {
    await this.validateUserExists(userId);
    return this.taskRepository.findAll(userId);
  }
}
