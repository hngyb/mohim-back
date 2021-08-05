import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Groups } from 'src/entities/Groups';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Groups) private groupRepository: Repository<Groups>,
  ) {}

  async createGroup(group: CreateGroupDto) {
    const newGroup = new Groups();
    newGroup.church = group.church;
    newGroup.name = group.name;
    newGroup.isPublic = group.isPublic;
    await this.groupRepository.save(newGroup);
  }
}
