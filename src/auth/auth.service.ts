import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email_address: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email_address);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
  }

  async generateJwtToken(body: { email_address: string }) {
    const info = await this.userService.findOneByEmail(body.email_address);
    const token = await this.jwtService.signAsync({
      email_address: info.email_address,
      password: info.password,
    });
    return {
      token,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
  }
}
