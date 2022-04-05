import { Module } from '@nestjs/common';
import { SiteInfoService } from './site_info.service';
import { SiteInfoController } from './site_info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteInfo } from './entities/site_info.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SiteInfo]), UserModule],
  controllers: [SiteInfoController],
  providers: [SiteInfoService, UserService],
})
export class SiteInfoModule {}
