import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ApplicationCacheModule } from './cache/cache/cache.module';

@Module({
  imports: [DatabaseModule, AuthModule, ApplicationCacheModule]
})
export class InfrastructureModule {}
