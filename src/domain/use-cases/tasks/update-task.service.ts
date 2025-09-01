import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { TasksRepositoryService } from 'src/infrastructure/database/repositories/tasks.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ITask } from 'src/domain/interfaces/task.interface';
import { UpdateTaskDto } from 'src/gateways/controllers/tasks/dtos/update-task.dto';

@Injectable()
export class UpdateTaskService implements BaseUseCase {
  constructor(
    private readonly userRepository: UsersRepositoryService,
    private readonly taskRepository: TasksRepositoryService,
  ) {}

  async execute(payload: {
    task: UpdateTaskDto;
    userId: number;
  }): Promise<ITask> {
    const userData = await this.userRepository.findById(payload.userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }

    await this.taskRepository.updateById(payload.userId, payload.task);

    return this.taskRepository.findById(payload.userId, payload.task.id);
  }
}
