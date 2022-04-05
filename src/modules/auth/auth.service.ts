import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

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
    let token: any;
    let info: any;

    info = await this.userService.findOneByEmail(body.email_address);

    token = await this.jwtService.signAsync({
      email_address: info.email_address,
      password: info.password,
    });

    return {
      token,
    };
  }
}
