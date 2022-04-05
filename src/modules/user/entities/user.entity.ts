import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { SiteInfo } from 'src/modules/site_info/entities/site_info.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Rating } from 'src/modules/rating/entities/rating.entity';

@Entity({ name: 'user' })
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  contact: string;

  @Unique(['email_address'])
  @Column({ nullable: true })
  email_address: string;

  @Exclude()
  @Unique(['username'])
  @Column({ nullable: true })
  username: string;

  @Exclude()
  @Unique(['password'])
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: string;

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

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @BeforeInsert()
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
