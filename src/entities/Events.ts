import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Groups } from './Groups';

@Entity({ schema: 'mohim', name: 'events' })
export class Events {
  @ApiProperty({
    example: 1,
    description: '일정 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '청년회 전체교제',
    description: '일정 제목',
  })
  @Column('varchar', { name: 'title', length: 300 })
  title: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2021-08-02',
    description: '날짜',
  })
  @Column('date', { name: 'date' })
  date: Date;

  @ApiProperty({
    example: '00:00',
    description: '시작 시간',
  })
  @Column('time', { name: 'startTime', nullable: true })
  startTime: Date | null;

  @ApiProperty({
    example: '12:00',
    description: '종료 시간',
  })
  @Column('time', { name: 'endTime', nullable: true })
  endTime: Date | null;

  @IsString()
  @ApiProperty({
    example: '일산교회 대강당',
    description: '일정 장소',
  })
  @Column('varchar', { name: 'location', length: 100, nullable: true })
  location: string | null;

  @IsString()
  @ApiProperty({
    example: '비대면 모임입니다.',
    description: '일정 공지사항',
  })
  @Column('text', { name: 'notice', nullable: true })
  notice: string | null;

  @Column('int', { name: 'GroupId', nullable: false })
  GroupId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => Groups, (groups) => groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'GroupId', referencedColumnName: 'id' }])
  Group: Groups;
}
