import { Menu } from 'src/menu/entities/menu.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  order_id: string;

  @Column({ nullable: true })
  menu_id: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  no_of_serving: string;

  @Column({ nullable: true })
  tolal_amount: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;

  @ManyToOne(() => Menu, (menu) => menu.menuToOrderDetails)
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menu: Menu;

  @ManyToOne(() => Order, (order) => order.orderToOrderDetails)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
