import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'mohim', name: 'users' })
export class Users {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
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
    description: '비밀번호',
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
