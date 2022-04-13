import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}
  async create(createRatingDto: CreateRatingDto) {
    const rating: Rating = await this.ratingRepository.create(createRatingDto);
    await this.ratingRepository.save(rating);
    return 'Tạo đánh giá thành công';
  }

  async findAll() {
    const ratings: Rating[] = await this.ratingRepository.find({
      relations: ['menu', 'user'],
    });
    return ratings;
  }

  async findOne(id: string) {
    const rating: Rating = await this.ratingRepository.findOneOrFail(id, {
      relations: ['menu', 'user'],
    });
    return rating;
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const rating: Rating = await this.findOne(id);
    await this.ratingRepository.update(rating.id, updateRatingDto);
    return 'Cập nhật đánh giá thành công';
  }

  async remove(id: string) {
    const rating: Rating = await this.findOne(id);
    await this.ratingRepository.delete(rating.id);
    return 'Xóa đánh giá thành công';
  }
}
