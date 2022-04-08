import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteInfoDto } from './dto/create-site_info.dto';
import { UpdateSiteInfoDto } from './dto/update-site_info.dto';
import { SiteInfo } from './entities/site_info.entity';

@Injectable()
export class SiteInfoService {
  constructor(
    @InjectRepository(SiteInfo)
    private siteInfoRepository: Repository<SiteInfo>,
  ) {}
  async create(createSiteInfoDto: CreateSiteInfoDto) {
    const siteInfo = await this.siteInfoRepository.create(createSiteInfoDto);
    await this.siteInfoRepository.save(siteInfo);
    return { ...siteInfo };
  }

  async findAll() {
    const siteInfos: SiteInfo[] = await this.siteInfoRepository.find();
    return siteInfos;
  }

  findOne(id: string) {
    return this.siteInfoRepository.findOneOrFail(id);
  }

  async update(id: string, updateSiteInfoDto: UpdateSiteInfoDto) {
    await this.siteInfoRepository.update(id, updateSiteInfoDto);
    return 'Cập nhật thông tin cửa hàng thành công';
  }

  async remove(id: string) {
    await this.siteInfoRepository.delete(id);
    return 'Xóa thông tin cửa hàng thành công';
  }
}
