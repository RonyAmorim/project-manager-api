import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { IUser } from 'src/domain/interfaces/user.interface';
import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetUserByIdService implements BaseUseCase {
  constructor(private readonly userRepository: UsersRepositoryService) {}

  execute(id: number): Promise<IUser> {
    return this.userRepository.findById(id);
  }
}
