import { Module } from '@nestjs/common';
import { SiteInfoService } from './site_info.service';
import { SiteInfoController } from './site_info.controller';

@Module({
  controllers: [SiteInfoController],
  providers: [SiteInfoService]
})
export class SiteInfoModule {}
