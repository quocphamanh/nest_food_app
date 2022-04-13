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
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { JwtOAuthGuard } from 'src/core/guard/jwt.guard';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/enums/constants.enum';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_CUSTOMER, Role.IS_EMPLOYEE])
  @Post('/create')
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(createRatingDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_CUSTOMER, Role.IS_EMPLOYEE])
  @Get('/list')
  findAll() {
    return this.ratingService.findAll();
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_CUSTOMER, Role.IS_EMPLOYEE])
  @Get('/show/:id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(id);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_CUSTOMER, Role.IS_EMPLOYEE])
  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingService.update(id, updateRatingDto);
  }

  @UseGuards(JwtOAuthGuard, RolesGuard)
  @Roles([Role.IS_ADMIN, Role.IS_CUSTOMER, Role.IS_EMPLOYEE])
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(id);
  }
}
