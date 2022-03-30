import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  order_id: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  paid_by: string;

  @Column({ nullable: true })
  payment_date: string;

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

  @OneToOne(() => Order, order => order.payment)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
