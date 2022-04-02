import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSiteInfoDto {
  @IsNotEmpty()
  @IsString()
  site_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEmail()
  @IsString()
  contact_info: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
