import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuTypeDto } from './create-menu_type.dto';

export class UpdateMenuTypeDto extends PartialType(CreateMenuTypeDto) {}
