import { Injectable } from '@nestjs/common';
import { BaseUseCaseImpl } from '../base-use-case';
import { ProjectsRepositoryService } from 'src/infrastructure/database/repositories/projects.repository.service';
import { IProject } from 'src/domain/interfaces/project.interface';
import { CreateProjectDto } from 'src/gateways/controllers/projects/dtos/create-project.dto';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class CreateProjectService extends BaseUseCaseImpl {
  constructor(
    userRepository: UsersRepositoryService,
    private readonly projectRepository: ProjectsRepositoryService,
  ) {
    super(userRepository);
  }

  async execute(payload: {
    project: CreateProjectDto;
    userId: number;
  }): Promise<IProject> {
    await this.validateUserExists(payload.userId);

    const createdProject = await this.projectRepository.add({
      name: payload.project.name,
      description: payload.project.description,
      user: {
        id: payload.userId,
      },
    });

    if (!createdProject) {
      throw new Error('Erro ao criar o projeto');
    }

    return createdProject;
  }
}
