import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { CreateUserDto } from '@project-manager-api/gateways/controllers/users/dtos/create-user.dto';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';
import { IUser } from '@app/common';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserService implements BaseUseCase {
  private readonly DEFAULT_SALT_ROUNDS = 10;
  constructor(private readonly userRepository: UsersRepositoryService) {}

  async execute(user: CreateUserDto): Promise<IUser> {
    const hasehedPassword = await hash(user.password, this.DEFAULT_SALT_ROUNDS);
    const createdUser = await this.userRepository.add({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      password: hasehedPassword,
    });

    if (!createdUser) {
      throw new Error('Erro ao criar usuário');
    }
    return createdUser;
  }
}
