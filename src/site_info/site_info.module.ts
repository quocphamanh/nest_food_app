import { Module } from '@nestjs/common';
import { SiteInfoService } from './site_info.service';
import { SiteInfoController } from './site_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteInfo } from './entities/site_info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteInfo])],
  controllers: [SiteInfoController],
  providers: [SiteInfoService]
})
export class SiteInfoModule {}
