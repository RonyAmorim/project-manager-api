import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { IProject } from 'src/domain/interfaces/project.interface';

@Injectable()
export class GetAllProjectsService implements BaseUseCase {
  constructor(
    private readonly projectRepository: ProjectsRepositoryService,
    private readonly userRepository: UsersRepositoryService,
  ) {}

  async execute(userId: number): Promise<IProject[]> {
    const userData = await this.userRepository.findById(userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }

    return this.projectRepository.findAll(userId);
  }
}
