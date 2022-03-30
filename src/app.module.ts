import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { MenuModule } from './menu/menu.module';
import { MenuTypeModule } from './menu_type/menu_type.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { PaymentModule } from './payment/payment.module';
import { RatingModule } from './rating/rating.module';
import { SiteInfoModule } from './site_info/site_info.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './core/filter/global-exception.filter';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
