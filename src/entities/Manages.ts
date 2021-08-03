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
@Entity({ schema: 'mohim', name: 'manages' })
export class Manages {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column('int', { primary: true, name: 'UserId' })
  UserId: number;

  @Column('int', { primary: true, name: 'GroupId' })
  GroupId: number;

  @ManyToOne(() => Users, (users) => users.Manages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  Manager: Users;

  @ManyToOne(() => Groups, (groups) => groups.Managers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'GroupId', referencedColumnName: 'id' }])
  ManageGroup: Groups;
}
