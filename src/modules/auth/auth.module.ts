import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from 'src/core/strategies/local_auth.strategy';
import { JwtStrategy } from 'src/core/strategies/jwt.stragety';
import { UserModule } from '../user/user.module';
import { CustomerModule } from '../customer/customer.module';
import { UserService } from '../user/user.service';
import { CustomerService } from '../customer/customer.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    UserModule,
    CustomerModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MailModule,
  ],
  providers: [
    AuthService,
    UserService,
    MailService,
    CustomerService,
    LocalAuthGuard,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
