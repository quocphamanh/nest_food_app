import { Customer } from 'src/customer/entities/customer.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  customer_id: string;

  @Column({ nullable: true, type: 'datetime' })
  order_date: string;

  @Column({ nullable: true })
  total_amount: string;

  @Column({ nullable: true })
  order_status: string;

  @Column({ nullable: true })
  processed_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderToOrderDetails: OrderDetail[];
}
