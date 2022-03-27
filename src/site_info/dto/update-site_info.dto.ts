import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteInfoDto } from './create-site_info.dto';

export class UpdateSiteInfoDto extends PartialType(CreateSiteInfoDto) {}
