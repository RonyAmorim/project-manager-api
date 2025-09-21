import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserService } from '@project-manager-api/domain/use-cases/users/create-user.service';
import { GetUserByIdService } from '@project-manager-api/domain/use-cases/users/get-user-by-id.service';
import { Public } from '@project-manager-api/gateways/guards/auth-guard.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserService,
    private readonly updateUserUseCase: CreateUserService,
    private readonly getUserByIdUseCase: GetUserByIdService,
  ) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.createUserUseCase.execute(createUserDto);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
