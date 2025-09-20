import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service';
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service';
import { UpdateTaskService } from 'src/domain/use-cases/tasks/update-task.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskService,
    private readonly getAllTasksUseCase: GetAllTasksService,
    private readonly getTaskByIdUseCase: GetTaskByIdService,
    private readonly updateTaskUseCase: UpdateTaskService,
  ) {}

  @Get()
  findAll(@Req() request) {
    try {
      const loggedUser = request.user;
      return this.getAllTasksUseCase.execute(loggedUser.sub);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: number) {
    try {
      const loggedUser = request.user;
      return this.getTaskByIdUseCase.execute({
        userId: loggedUser.sub,
        taskId: id,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
    try {
      const loggedUser = request.user;
      return this.createTaskUseCase.execute({
        task: createTaskDto,
        userId: loggedUser.sub,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
