import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
