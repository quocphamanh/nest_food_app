import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.userRepository.save(createUserDto);
    return {
      message: 'Tạo tài khoản thành công',
    };
  }

  async findAll() {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user: User = await this.userRepository.findOneOrFail(id, {
      relations: ['siteInfo'],
    });
    return user;
  }

  async findOneByEmail(email_address: string) {
    const user: User = await this.userRepository.findOneOrFail({
      relations: ['siteInfo', 'orders', 'ratings'],
      where: {
        email_address: email_address,
      },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return 'Cập nhật tài khoản thành công';
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return 'Xóa tài khoản thành công';
  }
}
