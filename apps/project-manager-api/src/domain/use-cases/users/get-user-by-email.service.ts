import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base-use-case';
import { UsersRepositoryService } from '@project-manager-api/infrastructure/database/repositories/users.repository.service';
import { IUser } from '@app/common';

@Injectable()
export class GetUserByEmailService implements BaseUseCase {
  constructor(private readonly userRepository: UsersRepositoryService) {}

  execute(email: string): Promise<IUser> {
    return this.userRepository.findByEmail(email);
  }
}
