import { Module } from '@nestjs/common';
import { CreateUserService } from './create-user.service';
import { GetUserByIdService } from './get-user-by-id.service';
import { GetUserByEmailService } from './get-user-by-email.service';

@Module({
  providers: [CreateUserService, GetUserByIdService, GetUserByEmailService]
})
export class UsersModule {}
