import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/entities/Events';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { getManager } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events) private eventRepository: Repository<Events>,
  ) {}

  async createEvent(event: CreateEventDto) {
    const newEvent = new Events();
    newEvent.title = event.title;
    newEvent.date = event.date;
    newEvent.startTime = event.startTime;
    newEvent.endTime = event.endTime;
    newEvent.location = event.location;
    newEvent.notice = event.notice;
    newEvent.GroupId = event.GroupId;
    await this.eventRepository.save(newEvent);
  }

  async getEvents(date: Date | null, groupId: number) {
    const entitiyManager = getManager();
    if (date == null) {
      return await entitiyManager.query(`
        SELECT * FROM events WHERE groupID = ${groupId}`);
    } else {
      return await entitiyManager.query(`
    SELECT * FROM events WHERE DATE(updatedAt) >= DATE('${date}') and groupID = ${groupId}`);
    }
  }
}
