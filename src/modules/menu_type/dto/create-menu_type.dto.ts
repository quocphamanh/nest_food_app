import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMenuTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  parentId: string;
}
