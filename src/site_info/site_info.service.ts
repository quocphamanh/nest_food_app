import { Injectable } from '@nestjs/common';
import { CreateSiteInfoDto } from './dto/create-site_info.dto';
import { UpdateSiteInfoDto } from './dto/update-site_info.dto';

@Injectable()
export class SiteInfoService {
  create(createSiteInfoDto: CreateSiteInfoDto) {
    return 'This action adds a new siteInfo';
  }

  findAll() {
    return `This action returns all siteInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} siteInfo`;
  }

  update(id: number, updateSiteInfoDto: UpdateSiteInfoDto) {
    return `This action updates a #${id} siteInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} siteInfo`;
  }
}
