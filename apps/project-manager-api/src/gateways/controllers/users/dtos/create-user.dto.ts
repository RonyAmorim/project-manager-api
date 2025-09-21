import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome do Usuario  não pode estar vazio' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'O sobrenome do Usuario não pode estar vazio' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'O email do Usuario não pode estar vazio' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'A senha do Usuario não pode estar vazia' })
  @IsString()
  password: string;
}
