import { Injectable } from '@nestjs/common';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { BaseUseCaseImpl } from '../base-use-case';
import { IProject } from 'src/domain/interfaces/project.interface';

@Injectable()
export class GetProjectByIdService extends BaseUseCaseImpl {
  constructor(
    userRepository: UsersRepositoryService,
    private readonly projectRepository: ProjectsRepositoryService,
  ) {
    super(userRepository);
  }

  async execute(payload: {
    userId: number;
    projectId: number;
  }): Promise<IProject> {
    await this.validateUserExists(payload.userId);
    return this.projectRepository.findById(payload.userId, payload.projectId);
  }
}
