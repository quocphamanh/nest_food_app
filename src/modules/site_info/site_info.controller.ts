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
import { SiteInfoService } from './site_info.service';
import { CreateSiteInfoDto } from './dto/create-site_info.dto';
import { UpdateSiteInfoDto } from './dto/update-site_info.dto';
import { JwtOAuthGuard } from 'src/core/guard/jwt.guard';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/enums/constants.enum';

@Controller('site-info')
export class SiteInfoController {
  constructor(private readonly siteInfoService: SiteInfoService) {}

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN])
  @Post('/create')
  create(@Body() createSiteInfoDto: CreateSiteInfoDto) {
    return this.siteInfoService.create(createSiteInfoDto);
  }

  @UseGuards(JwtOAuthGuard)
  @Get('/list')
  findAll() {
    return this.siteInfoService.findAll();
  }

  @UseGuards(JwtOAuthGuard)
  @Get('/show/:id')
  findOne(@Param('id') id: number) {
    return this.siteInfoService.findOne(id);
  }

  @UseGuards(JwtOAuthGuard)
  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateSiteInfoDto: UpdateSiteInfoDto,
  ) {
    return this.siteInfoService.update(+id, updateSiteInfoDto);
  }

  @UseGuards(JwtOAuthGuard)
  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    return this.siteInfoService.remove(id);
  }
}
