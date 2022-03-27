import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
