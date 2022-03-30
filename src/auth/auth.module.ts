import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalAuthGuard } from 'src/core/strategies/local_auth.strategy';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from 'src/core/strategies/jwt.stragety';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, UserService, LocalAuthGuard, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
