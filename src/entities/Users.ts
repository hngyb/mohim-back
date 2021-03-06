import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Follows } from './Follows';
import { Groups } from './Groups';
import { Manages } from './Manages';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'mohim', name: 'users' })
export class Users {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;

  @IsEmail()
  @ApiProperty({
    example: 'example@example.com',
    description: '이메일',
  })
  @Column('varchar', { name: 'email', unique: true, length: 50 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '김홍엽',
    description: '이름',
  })
  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'abcd1234!@#$',
    description: '해시된 비밀번호',
  })
  @Column('varchar', { name: 'password', length: 300, select: false })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'currentHashedRefreshToken',
    description: 'Refresh 토큰',
  })
  @Column('varchar', {
    name: 'currentHashedRefreshToken',
    length: 300,
    nullable: true,
  })
  currentHashedRefreshToken: string;

  @IsString()
  @ApiProperty({
    example: 'brother',
    description: '형제 또는 자매',
  })
  @Column('enum', { name: 'sex', enum: ['brother', 'sister'], nullable: true })
  sex: 'brother' | 'sister' | null;

  @IsString()
  @ApiProperty({
    example: '010-1234-5678',
    description: '핸드폰 번호',
  })
  @Column('varchar', { name: 'phoneNumber', length: 15, nullable: true })
  phone_number: string | null;

  @IsString()
  @ApiProperty({
    example: '경기도 파주시',
    description: '주소',
  })
  @Column('varchar', { name: 'address', length: 200, nullable: true })
  address: string | null;

  @IsDate()
  @ApiProperty({
    example: '1997-05-28',
    description: '생년월일',
  })
  @Column('date', { name: 'birthday', nullable: true })
  birthday: Date | null;

  @IsDate()
  @ApiProperty({
    example: '2004-01-01',
    description: '구원생일',
  })
  @Column('date', { name: 'salvationDate', nullable: true })
  salvation_date: Date | null;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    description: '성도 인증',
  })
  @Column('boolean', { name: 'isAuthorized', default: false })
  isAuthorized: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToMany(() => Groups, (groups) => groups.Followers)
  @JoinTable({
    name: 'follows',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'GroupId',
      referencedColumnName: 'id',
    },
  })
  FollowGroups: Groups[];

  @OneToMany(() => Follows, (follows) => follows.Follower)
  Follows: Follows[];

  @ManyToMany(() => Groups, (groups) => groups.Managers)
  @JoinTable({
    name: 'manages',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'GroupId',
      referencedColumnName: 'id',
    },
  })
  ManageGroups: Groups[];

  @OneToMany(() => Manages, (manages) => manages.Manager)
  Manages: Manages[];
}
