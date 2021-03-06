import { MenuType } from '../../menu_type/entities/menu_type.entity';
import { OrderDetail } from '../../order_details/entities/order_detail.entity';
import { Rating } from '../../rating/entities/rating.entity';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, type: 'double precision' })
  price: number;

  @Column({ nullable: true })
  type_id: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true, type: 'json' })
  ingredients: any;

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
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'type_id', referencedColumnName: 'id' })
  menuType: MenuType;

  @OneToMany(() => Rating, (rating) => rating.menu)
  ratings: Rating[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.menu)
  menuToOrderDetails: OrderDetail[];
}
