import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SiteInfoService } from './site_info.service';
import { CreateSiteInfoDto } from './dto/create-site_info.dto';
import { UpdateSiteInfoDto } from './dto/update-site_info.dto';

@Controller('site-info')
export class SiteInfoController {
  constructor(private readonly siteInfoService: SiteInfoService) {}

  @Post()
  create(@Body() createSiteInfoDto: CreateSiteInfoDto) {
    return this.siteInfoService.create(createSiteInfoDto);
  }

  @Get()
  findAll() {
    return this.siteInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteInfoDto: UpdateSiteInfoDto) {
    return this.siteInfoService.update(+id, updateSiteInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteInfoService.remove(+id);
  }
}
