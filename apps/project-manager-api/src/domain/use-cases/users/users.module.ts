import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { GetUserByIdService } from './get-user-by-id.service';
import { GetUserByEmailService } from './get-user-by-email.service';
import { DatabaseModule } from '@project-manager-api/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateUserService, GetUserByIdService, GetUserByEmailService],
  exports: [CreateUserService, GetUserByIdService, GetUserByEmailService],
})
export class UsersModule {}
