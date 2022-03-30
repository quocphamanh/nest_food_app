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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user: User = await this.userRepository.findOneOrFail(id);
    delete user.password;
    delete user.username;
    return user;
  }

  async findOneByEmail(email_address: string) {
    const user: User = await this.userRepository.findOneOrFail({
      where: {
        email_address: email_address,
      },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
