import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from '../event/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'first_name',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'last_name',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
    nullable: false,
    select: false,
  })
  password: string;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
