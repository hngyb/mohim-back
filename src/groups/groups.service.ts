import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Groups } from 'src/entities/Groups';
import { getManager, Repository } from 'typeorm';
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

  async getGroupId(name: string, church: string) {
    return this.groupRepository.findOne({
      where: { name, church },
      select: ['id', 'name', 'church', 'category'],
    });
  }

  async getGroupName(groupId: number) {
    return this.groupRepository.findOne({
      where: { id: groupId },
      select: ['id', 'name', 'church', 'category'],
    });
  }

  async getChurchList() {
    return this.groupRepository.find({
      where: { category: 'church' },
      select: ['id', 'name', 'church', , 'isPublic', 'category'],
    });
  }

  async getAllList(church: string) {
    return this.groupRepository.find({
      where: { church: church },
      select: ['id', 'name', 'church', , 'isPublic', 'category'],
    });
  }

  async getDistrictList(church: string) {
    return this.groupRepository.find({
      where: { church: church, category: 'district' },
      select: ['id', 'name', 'church', , 'isPublic', 'category'],
    });
  }

  async getDepartmentList(church: string) {
    return this.groupRepository.find({
      where: { church: church, category: 'department' },
      select: ['id', 'name', 'church', , 'isPublic', 'category'],
    });
  }

  async getServiceList(church: string) {
    return this.groupRepository.find({
      where: { church: church, category: 'service' },
      select: ['id', 'name', 'church', , 'isPublic', 'category'],
    });
  }
}
