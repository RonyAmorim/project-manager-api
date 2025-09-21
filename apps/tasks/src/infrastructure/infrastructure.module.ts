import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity, ProjectEntity, UserEntity } from '@app/common';
import { TasksRepositoryService } from './database/repositories/tasks.repository.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, ProjectEntity, UserEntity]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  providers: [TasksRepositoryService],
  exports: [TasksRepositoryService],
})
export class InfrastructureModule {}
