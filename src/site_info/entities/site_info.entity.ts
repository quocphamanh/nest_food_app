import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'site_info' })
export class SiteInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  site_name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  contact_info: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;
}
