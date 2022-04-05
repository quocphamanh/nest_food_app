import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('myjwt'))
  async login(@Body() body) {
    const token = await this.authService.generateJwtToken(body);
    return {
      type: 'login',
      message: 'Đăng nhập thành công',
      ...token,
    };
  }

  @Post('/send-mail')
  async sendMail(@Body() body) {
    await this.authService.sendMailResetPassword(body.email_address);
  }
}
