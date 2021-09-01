import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Groups } from './Groups';
import { Users } from './Users';

@Index('UserId', ['UserId'], {})
@Entity({ schema: 'mohim', name: 'follows' })
export class Follows {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column('varchar', { primary: true, name: 'UserId' })
  UserId: string;

  @Column('int', { primary: true, name: 'GroupId' })
  GroupId: number;

  @Column('char', { name: 'color', length: 7 })
  color: string;

  @ManyToOne(() => Users, (users) => users.Follows, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  Follower: Users;

  @ManyToOne(() => Groups, (groups) => groups.Follows, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'GroupId', referencedColumnName: 'id' }])
  FollowGroup: Groups;
}
