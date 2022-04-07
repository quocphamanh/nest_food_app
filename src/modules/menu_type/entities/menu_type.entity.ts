import { Menu } from '../../menu/entities/menu.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity({ name: 'menu_type' })
@Tree('closure-table')
export class MenuType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @TreeChildren({ cascade: ['soft-remove', 'remove', 'recover'] })
  children: MenuType[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: MenuType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: string;

  @OneToMany(() => Menu, (menu) => menu.menuType)
  menus: Menu[];
}
