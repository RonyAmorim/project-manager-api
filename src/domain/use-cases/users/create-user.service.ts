import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { CreateUserDto } from 'src/gateways/controllers/users/dtos/create-user.dto';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { IUser } from 'src/domain/interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserService implements BaseUseCase {
  private readonly DEFAULT_SALT_ROUNDS = 10;
  constructor(private readonly userRepository: UsersRepositoryService) {}

  async execute(user: CreateUserDto): Promise<IUser> {
    const hasehedPassword = await hash(user.password, this.DEFAULT_SALT_ROUNDS);
    const createdUser = await this.userRepository.add({
      ...user,
      password: hasehedPassword,
    });

    if (!createdUser) {
      throw new Error('Erro ao criar usuário');
    }
    return createdUser;
  }
}
