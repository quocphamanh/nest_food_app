import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  full_name: string;

  contact: string;

  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
