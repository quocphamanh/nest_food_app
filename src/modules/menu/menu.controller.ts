import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ValidationPipe } from 'src/core/pipes/validation.pipe';
import { JwtOAuthGuard } from 'src/core/guard/jwt.guard';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/enums/constants.enum';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE])
  @Post('/create')
  async create(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.create(createMenuDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE])
  @Get('/list')
  findAll() {
    return this.menuService.findAll();
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE])
  @Get('/show/:id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE])
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_EMPLOYEE])
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
