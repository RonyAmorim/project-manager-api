import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProjectService } from '@project-manager-api/domain/use-cases/projects/create-project.service';
import { GetAllProjectsService } from '@project-manager-api/domain/use-cases/projects/get-all-projects.service';
import { GetProjectByIdService } from '@project-manager-api/domain/use-cases/projects/get-project-by-id.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectService,
    private readonly getAllProjectsUseCase: GetAllProjectsService,
    private readonly getProjectByIdUseCase: GetProjectByIdService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  @Get()
  async findAll(@Req() request) {
    try {
      const loggedUser = request.user;
      const cachedData = await this.cacheService.get(
        `user-${loggedUser.sub}/projects/all`,
      );

      if (cachedData) {
        console.log('Retornando dos do cache...');
        return cachedData;
      }

      const data = await this.getAllProjectsUseCase.execute(loggedUser.sub);
      this.cacheService.set(`user-${loggedUser.sub}/projects/all`, data);
      return data;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: number) {
    try {
      const loggedUser = request.user;
      return this.getProjectByIdUseCase.execute({
        userId: loggedUser.sub,
        projectId: id,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Req() request, @Body() createProjectDto: CreateProjectDto) {
    try {
      const loggedUser = request.user;
      return this.createProjectUseCase.execute({
        userId: loggedUser.sub,
        project: createProjectDto,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
