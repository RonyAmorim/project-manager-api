import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { CreateUserDto } from 'src/gateways/controllers/users/dtos/create-user.dto';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { IUser } from 'src/domain/interfaces/user.interface';

@Injectable()
export class CreateUserService implements BaseUseCase {
  constructor(private readonly userRepository: UsersRepositoryService) {}

  async execute(user: CreateUserDto): Promise<IUser> {
    const createdUser = await this.userRepository.add(user);

    if (!createdUser) {
      throw new Error('Erro ao criar usuário');
    }
    return createdUser;
  }
}
