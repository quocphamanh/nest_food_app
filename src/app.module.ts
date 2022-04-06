import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './core/guard/roles.guard';
import { ResponseInterceptor } from './core/interceptor/response.interceptor';
import { UserService } from './modules/user/user.service';
import { OrdersModule } from './modules/orders/orders.module';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { MenuModule } from './modules/menu/menu.module';
import { MenuTypeModule } from './modules/menu_type/menu_type.module';
import { OrderDetailsModule } from './modules/order_details/order_details.module';
import { PaymentModule } from './modules/payment/payment.module';
import { RatingModule } from './modules/rating/rating.module';
import { SiteInfoModule } from './modules/site_info/site_info.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    OrdersModule,
    UserModule,
    CustomerModule,
    MenuModule,
    MenuTypeModule,
    OrderDetailsModule,
    PaymentModule,
    RatingModule,
    SiteInfoModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
