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
@Entity({ schema: 'mohim', name: 'belongtos' })
export class BelongTos {
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

  @ManyToOne(() => Users, (users) => users.BelongTos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;

  @ManyToOne(() => Groups, (groups) => groups.BelongTos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'GroupId', referencedColumnName: 'id' }])
  BelongToGroup: Groups;
}
