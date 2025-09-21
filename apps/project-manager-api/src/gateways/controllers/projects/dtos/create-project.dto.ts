import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'O nome do projeto não pode estar vazio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A descriçao do projeto não pode estar vazio' })
  @IsString()
  description?: string;
}
