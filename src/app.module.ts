import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { MenuModule } from './menu/menu.module';
import { MenuTypeModule } from './menu_type/menu_type.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import { PaymentModule } from './payment/payment.module';
import { RatingModule } from './rating/rating.module';
import { SiteInfoModule } from './site_info/site_info.module';

@Module({
  imports: [TypeOrmModule.forRoot(), OrdersModule, UserModule, CategoryModule, CustomerModule, MenuModule, MenuTypeModule, OrderDetailsModule, PaymentModule, RatingModule, SiteInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
