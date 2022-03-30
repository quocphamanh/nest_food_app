import { MenuType } from 'src/menu_type/entities/menu_type.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, type: 'float' })
  price: string;

  @Column({ nullable: true })
  type_id: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, type: 'text' })
  ingredients: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;

  @ManyToOne(() => MenuType, (menuType) => menuType.menus, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'type_id', referencedColumnName: 'id' })
  menuType: MenuType;

  @OneToMany(() => Rating, (rating) => rating.menu)
  ratings: Rating[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.menu)
  menuToOrderDetails: OrderDetail[];
}
