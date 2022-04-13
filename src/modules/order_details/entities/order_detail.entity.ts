import { Menu } from '../../menu/entities/menu.entity';
import { Order } from '../../orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  order_id: string;

  @Column({ nullable: true })
  menu_id: string;

  @Column({ nullable: true, type: 'int' })
  quantity: number;

  @Column({ nullable: true })
  no_of_serving: string;

  @Column({ nullable: true, type: 'double precision' })
  tolal_amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;

  @ManyToOne(() => Menu, (menu) => menu.menuToOrderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menu: Menu;

  @ManyToOne(() => Order, (order) => order.orderToOrderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
