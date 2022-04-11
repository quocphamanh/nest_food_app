import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Menu } from '../menu/entities/menu.entity';
import { OrderDetail } from '../order_details/entities/order_detail.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private connection: Connection,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const order: Order = await queryRunner.manager
      .getRepository(Order)
      .create(createOrderDto);
    const orderDetails: OrderDetail[] = [];

    for await (const el of createOrderDto?.orderDetails) {
      const menu = await queryRunner.manager
        .getRepository(Menu)
        .findOneOrFail(el.menu_id);

      orderDetails.push(
        await queryRunner.manager.getRepository(OrderDetail).create({
          menu_id: el.menu_id,
          quantity: el.quantity,
          tolal_amount: el.quantity * menu.price,
        }),
      );
    }

    try {
      const returned = await queryRunner.manager
        .getRepository(Order)
        .save(order);
      orderDetails.forEach(async (el) => {
        await queryRunner.manager
          .getRepository(OrderDetail)
          .save({ ...el, order_id: returned.id });
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const orders: Order[] = await this.orderRepository.find({
      relations: ['user', 'payment', 'orderToOrderDetails'],
    });
    return orders;
  }

  async findOne(id: string) {
    const order: Order = await this.orderRepository.findOne(id, {
      relations: ['user', 'payment', 'orderToOrderDetails'],
    });
    if (order) {
      return order;
    }
    throw new NotFoundException('Không tìm thấy order');
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order: Order = await this.findOne(id);
    await this.orderRepository.update(order.id, updateOrderDto);
    return 'Cập nhật order thành công';
  }

  async remove(id: string) {
    const order: Order = await this.findOne(id);
    await this.orderRepository.delete(order.id);
    return 'Xóa order thành công';
  }
}
