import { Menu } from '../../menu/entities/menu.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Scrore } from 'src/core/enums/constants.enum';

@Entity({ name: 'rating' })
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  menu_id: string;

  @Column({ nullable: true, type: 'enum', enum: Scrore, default: Scrore.GOOD })
  scrore: Scrore;

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

  @ManyToOne(() => Menu, (menu) => menu.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id', referencedColumnName: 'id' })
  menu: Menu;

  @ManyToOne(() => User, (user) => user.ratings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
