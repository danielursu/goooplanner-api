import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'timestamp',
    name: 'start_date',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
    name: 'end_date',
    nullable: false,
  })
  endDate: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  type: string;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  constructor(partial?: Partial<Event>) {
    Object.assign(this, partial);
  }
}