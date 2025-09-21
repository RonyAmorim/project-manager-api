import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { IUser } from '@app/common';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';

@Injectable()
export class GetUserByIdService implements BaseUseCase {
  constructor(private readonly userRepository: UsersRepositoryService) {}

  execute(id: number): Promise<IUser> {
    return this.userRepository.findById(id);
  }
}
