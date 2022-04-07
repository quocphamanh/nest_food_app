import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return 'Tạo tài khoản thành công';
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return 'Cập nhật tài khoản thành công';
  }

  async updatePassword(id: string, body: UpdateUserPasswordDto) {
    await this.userRepository.update(id, {
      password: await bcrypt.hash(body.password, 10),
    });
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return 'Xóa tài khoản thành công';
  }
}
