import { Module } from '@nestjs/common';
import { MenuTypeService } from './menu_type.service';
import { MenuTypeController } from './menu_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuType } from './entities/menu_type.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuType]), UserModule],
  controllers: [MenuTypeController],
  providers: [MenuTypeService, UserService],
})
export class MenuTypeModule {}
