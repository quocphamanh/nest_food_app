import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email_address,
      subject: 'Welcome to Food App! Confirm your Email',
      template: 'confirmation',
      context: {
        name: user.full_name,
        url,
      },
    });
  }
}
