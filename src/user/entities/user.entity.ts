import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
