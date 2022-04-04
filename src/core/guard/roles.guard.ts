import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<any>('ROLES_KEY', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = await context.switchToHttp().getRequest();

    if (!user) return true;
    const userData = await this.userService.findOneByEmail(user.email_address);
    if (requiredRoles.some((role) => userData.role?.includes(role))) {
      return true;
    }
    throw new UnauthorizedException('Không có quyền thực hiện');
  }
}
