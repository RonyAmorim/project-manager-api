import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'O nome da tarefa não pode estar vazio' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty({ message: 'O status da tarefa não pode estar vazio' })
  @IsString()
  status: 'pending' | 'completed';

  @IsNotEmpty({ message: 'O projeto referente à tarefa não pode estar vazio' })
  @IsNumber()
  projectId: number;
}
