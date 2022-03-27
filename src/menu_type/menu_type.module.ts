import { Module } from '@nestjs/common';
import { MenuTypeService } from './menu_type.service';
import { MenuTypeController } from './menu_type.controller';

@Module({
  controllers: [MenuTypeController],
  providers: [MenuTypeService]
})
export class MenuTypeModule {}
