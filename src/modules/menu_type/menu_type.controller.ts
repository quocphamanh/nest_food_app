import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MenuTypeService } from './menu_type.service';
import { CreateMenuTypeDto } from './dto/create-menu_type.dto';
import { UpdateMenuTypeDto } from './dto/update-menu_type.dto';
import { JwtOAuthGuard } from 'src/core/guard/jwt.guard';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Role } from 'src/core/enums/constants.enum';
import { Roles } from 'src/core/decorator/roles.decorator';

@Controller('menu-type')
export class MenuTypeController {
  constructor(private readonly menuTypeService: MenuTypeService) {}

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE])
  @Post('/create')
  create(@Body() createMenuTypeDto: CreateMenuTypeDto) {
    return this.menuTypeService.create(createMenuTypeDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN])
  @Get('/list')
  findAll() {
    return this.menuTypeService.findAll();
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE, Role.IS_CUSTOMER])
  @Get('/show/:id')
  findOne(@Param('id') id: string) {
    return this.menuTypeService.findOne(id);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE])
  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMenuTypeDto: UpdateMenuTypeDto,
  ) {
    return this.menuTypeService.update(id, updateMenuTypeDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE])
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.menuTypeService.remove(id);
  }
}
