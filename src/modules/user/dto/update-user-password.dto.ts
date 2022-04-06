import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { Match } from 'src/core/decorator/match.decorator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserPasswordDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  token_refresh: string;

  password?: string;

  @Match('password')
  password_confirm: string;
}
