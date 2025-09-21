import { Injectable } from '@nestjs/common';
import { IProject, ProjectEntity } from '@app/common';
import { IProjectsRepository } from '@project-manager-api/domain/repositories/projects-repository.interface';
import { DataSource, DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ProjectsRepositoryService
  extends Repository<ProjectEntity>
  implements IProjectsRepository
{
  constructor(dataSource: DataSource) {
    super(ProjectEntity, dataSource.createEntityManager());
  }

  findAll(userId: number): Promise<IProject[]> {
    return this.findBy({ user: { id: userId } });
  }
  findById(userId: number, id: number): Promise<IProject> {
    return this.findOneOrFail({
      relations: { tasks: true },
      where: { id, user: { id: userId } },
    });
  }
  add(payload: DeepPartial<IProject>): Promise<IProject> {
    return this.save(payload);
  }
}
