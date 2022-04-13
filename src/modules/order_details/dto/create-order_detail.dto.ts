import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDetailDto {
  // @IsNotEmpty()
  // @IsString()
  // order_id: string;

  @IsNotEmpty()
  @IsString()
  menu_id: string;

  // @IsOptional()
  // no_of_serving: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  // @IsNotEmpty()
  // @IsNumber()
  // tolal_amount: number;
}
