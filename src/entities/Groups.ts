import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BelongTos } from './BelongTos';
import { Events } from './Events';
import { Follows } from './Follows';
import { Manages } from './Manages';
import { Users } from './Users';

@Index('church', ['church'])
@Entity({ schema: 'mohim', name: 'groups' })
export class Groups {
  @ApiProperty({
    example: 1,
    description: '그룹 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '청년회',
    description: '그룹명',
  })
  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '일산교회',
    description: '교회명',
  })
  @Column('varchar', { name: 'church', length: 30 })
  church: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: 'true',
    description: '공개여부',
  })
  @Column('boolean', { name: 'isPublic' })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToMany(() => Users, (users) => users.BelongToGroups)
  Users: Users[];

  @OneToMany(() => BelongTos, (belongtos) => belongtos.BelongToGroup)
  BelongTos: BelongTos[];

  @ManyToMany(() => Users, (users) => users.FollowGroups)
  Followers: Users[];

  @OneToMany(() => Follows, (follows) => follows.FollowGroup)
  Follows: Follows[];

  @ManyToMany(() => Users, (users) => users.ManageGroups)
  Managers: Users[];

  @OneToMany(() => Manages, (manages) => manages.ManageGroup)
  Manages: Manages[];

  @OneToMany(() => Events, (events) => events.Group)
  Events: Events[];
}
