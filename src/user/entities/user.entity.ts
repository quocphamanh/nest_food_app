import { SiteInfo } from 'src/site_info/entities/site_info.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  contact: string;

  @Unique(['email_address'])
  @Column({ nullable: true })
  email_address: string;

  @Unique(['username'])
  @Column({ nullable: true })
  username: string;

  @Unique(['password'])
  @Column({ nullable: true })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;

  @OneToOne(() => SiteInfo, (siteInfo) => siteInfo.user, { eager: true })
  siteInfo: SiteInfo;
}
