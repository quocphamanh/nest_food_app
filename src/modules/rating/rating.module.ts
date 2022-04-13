import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), UserModule],
  controllers: [RatingController],
  providers: [RatingService, UserService],
})
export class RatingModule {}
