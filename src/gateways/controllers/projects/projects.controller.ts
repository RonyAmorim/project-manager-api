import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProjectService } from 'src/domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from 'src/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from 'src/domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectDto } from './dtos/create-project.dto';

const userId = 1;

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectService,
    private readonly getAllProjectsUseCase: GetAllProjectsService,
    private readonly getProjectByIdUseCase: GetProjectByIdService,
  ) {}

  @Get()
  findAll() {
    try {
      return this.getAllProjectsUseCase.execute(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.getProjectByIdUseCase.execute({ userId, projectId: id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    try {
      return this.createProjectUseCase.execute({
        userId,
        project: createProjectDto,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
