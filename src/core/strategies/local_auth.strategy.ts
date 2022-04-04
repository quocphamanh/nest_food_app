import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class LocalAuthGuard extends PassportStrategy(Strategy, 'myjwt') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email_address',
    });
  }

  validate(email_address: string, password: string): Promise<any> {
    return this.authService.validateUser(email_address, password);
  }
}
