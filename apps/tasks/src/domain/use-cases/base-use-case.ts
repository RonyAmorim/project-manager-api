import { IUser } from '@app/common';

export interface BaseUseCase {
  execute(...args: unknown[]): Promise<unknown>;
}

export abstract class BaseUseCaseImpl implements BaseUseCase {
  constructor() {}

  abstract execute(...args: unknown[]): Promise<unknown>;

  protected async validateUserExists(userId: number): Promise<IUser> {
    // For now, just return a dummy validation
    // In a real microservices setup, this would call the users service
    if (!userId) {
      throw new Error('Usuário não encontrado');
    }
    return { id: userId } as IUser;
  }
}