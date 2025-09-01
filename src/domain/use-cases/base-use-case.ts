import { UsersRepositoryService } from 'src/infrastructure/database/repositories/users.repository.service';
import { IUser } from '../interfaces/user.interface';

export interface BaseUseCase {
  execute(...args: unknown[]): Promise<unknown>;
}

export abstract class BaseUseCaseImpl implements BaseUseCase {
  constructor(protected readonly userRepository: UsersRepositoryService) {}

  abstract execute(...args: unknown[]): Promise<unknown>;

  protected async validateUserExists(userId: number): Promise<IUser> {
    const userData = await this.userRepository.findById(userId);
    if (!userData) {
      throw new Error('Usuário não encontrado');
    }
    return userData;
  }
}
