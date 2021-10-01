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

  async getMonthlyEvents(year: string, month: string, groupId: number) {
    const entitiyManager = getManager();
    return await entitiyManager.query(`
    SELECT id, title, startTime, endTime, location, notice, GroupId, createdAt, updatedAt, deletedAt, DATE_FORMAT(date,'%Y-%m-%d') AS date FROM events WHERE MONTH(date) = ${month} and YEAR(date) = ${year} and GroupId = ${groupId}`);
  }
}
