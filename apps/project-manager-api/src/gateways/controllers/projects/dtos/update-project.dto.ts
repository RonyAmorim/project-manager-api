import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
