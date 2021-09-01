import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { Groups } from 'src/entities/Groups';
import { Users } from 'src/entities/Users';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Groups, Events, Follows])],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
