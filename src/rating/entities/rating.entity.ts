import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rating' })
export class Rating {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  menu_id: string;

  @Column({ nullable: true })
  scrore: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ nullable: true, type: 'date' })
  date_recorded: string;

  @Column({ nullable: true })
  customer_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;
}
