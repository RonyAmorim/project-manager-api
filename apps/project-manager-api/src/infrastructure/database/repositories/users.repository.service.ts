import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { UserEntity, IUser } from '@app/common';
import { IUsersRepository } from '@project-manager-api/domain/repositories/users-repository.interface';

@Injectable()
export class UsersRepositoryService
  extends Repository<UserEntity>
  implements IUsersRepository
{
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  findById(id: number): Promise<IUser> {
    return this.findOneByOrFail({ id });
  }
  findByEmail(email: string): Promise<IUser> {
    return this.findOneByOrFail({ email });
  }
  add(payload: DeepPartial<IUser>): Promise<IUser> {
    return this.save(payload) as Promise<IUser>;
  }
}
