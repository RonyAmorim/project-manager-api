import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateTaskService } from 'src/domain/use-cases/tasks/create-task.service';
import { GetAllTasksService } from 'src/domain/use-cases/tasks/get-all-tasks.service';
import { GetTaskByIdService } from 'src/domain/use-cases/tasks/get-task-by-id.service';
import { UpdateTaskService } from 'src/domain/use-cases/tasks/update-task.service';
import { CreateTaskDto } from './dtos/create-task.dto';

const userId = 1;

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskService,
    private readonly getAllTasksUseCase: GetAllTasksService,
    private readonly getTaskByIdUseCase: GetTaskByIdService,
    private readonly updateTaskUseCase: UpdateTaskService,
  ) {}

  @Get()
  findAll() {
    try {
      return this.getAllTasksUseCase.execute(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.getTaskByIdUseCase.execute({ userId, taskId: id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return this.createTaskUseCase.execute({ task: createTaskDto, userId });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
