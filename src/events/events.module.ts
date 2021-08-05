import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BelongTos } from 'src/entities/BelongTos';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { Groups } from 'src/entities/Groups';
import { Users } from 'src/entities/Users';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Groups, Events, Follows, BelongTos]),
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
