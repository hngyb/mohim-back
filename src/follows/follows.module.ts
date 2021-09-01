import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Groups } from 'src/entities/Groups';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Groups, Events, Follows])],
  providers: [FollowsService],
  controllers: [FollowsController],
})
export class FollowsModule {}
