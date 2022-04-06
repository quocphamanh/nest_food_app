import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { UpdateUserPasswordDto } from '../user/dto/update-user-password.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
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

  async sendMailResetPassword(email_address: string) {
    const user: User = await this.userService.findOneByEmail(email_address);
    const newToken = await this.jwtService.signAsync({
      email_address: user.email_address,
      password: user.password,
    });
    await this.mailService.sendUserConfirmation(user, newToken);
  }

  async resetPassowrd(updateUserDto: UpdateUserPasswordDto) {
    try {
      const verifyUserToken = await this.jwtService.verify(
        updateUserDto.token_refresh,
      );
      if (verifyUserToken) {
        const userData = await this.userService.findOneByEmail(
          verifyUserToken.email_address,
        );
        await this.userService.updatePassword(userData.id, updateUserDto);
      }
    } catch (error) {
      throw new UnauthorizedException('Link đã hết hạn');
    }
  }
}
