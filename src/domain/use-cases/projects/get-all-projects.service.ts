import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from '../base-use-case';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { IProject } from 'src/domain/interfaces/project.interface';

@Injectable()
export class GetAllProjectsService extends BaseUseCaseImpl {
  constructor(
    userRepository: UsersRepositoryService,
    private readonly projectRepository: ProjectsRepositoryService,
  ) {
    super(userRepository);
  }

  async execute(userId: number): Promise<IProject[]> {
    await this.validateUserExists(userId);
    return this.projectRepository.findAll(userId);
  }
}
