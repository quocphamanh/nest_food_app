import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Scrore } from 'src/core/enums/constants.enum';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsString()
  menu_id: string;

  @IsEnum(Scrore)
  @IsNotEmpty()
  scrore: Scrore;

  @IsNotEmpty()
  @IsString()
  remarks: string;

  @IsOptional()
  @IsDate()
  date_recorded: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
