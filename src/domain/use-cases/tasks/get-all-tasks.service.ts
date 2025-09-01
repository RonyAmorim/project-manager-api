import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { ITask } from 'src/domain/interfaces/task.interface';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetAllTasksService implements BaseUseCase {
  constructor(
    private readonly userRepository: UsersRepositoryService,
    private readonly taskRepository: TasksRepositoryService,
  ) {}

  async execute(userId: number): Promise<ITask[]> {
    const userData = await this.userRepository.findById(userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }

    return this.taskRepository.findAll(userId);
  }
}
