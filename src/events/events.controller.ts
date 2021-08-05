import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@ApiTags('EVENTS')
@Controller('api/events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @ApiOperation({ summary: '일정 생성하기' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createEvent(@Body() data: CreateEventDto) {
    return await this.eventService.createEvent(data);
  }

  @ApiOperation({ summary: '일정 갖고오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getEvents(
    @Query('date') date: Date | null,
    @Query('groupId') groupId: number,
  ) {
    return this.eventService.getEvents(date, groupId);
  }
}
