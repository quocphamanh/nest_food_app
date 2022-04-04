import { Menu } from 'src/modules/menu/entities/menu.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rating' })
export class Rating {
  @PrimaryGeneratedColumn('uuid')
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
  user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;

  @ManyToOne(() => Menu, (menu) => menu.ratings)
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menu: Menu;

  @ManyToOne(() => User, (user) => user.ratings)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}