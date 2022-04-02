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

@Controller('site-info')
export class SiteInfoController {
  constructor(private readonly siteInfoService: SiteInfoService) {}

  @UseGuards(JwtOAuthGuard)
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
