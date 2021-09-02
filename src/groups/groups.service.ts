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

  async getChurchList() {
    const entitiyManager = getManager();
    return await entitiyManager.query(`
        SELECT * FROM mohim.groups WHERE name = church and category = 'church'`);
  }

  async getDistrictList(church: string) {
    const entitiyManager = getManager();
    return await entitiyManager.query(`
        SELECT * FROM mohim.groups WHERE church = '${church}' and category = 'district'`);
  }

  async getGroupList(church: string) {
    const entitiyManager = getManager();
    return await entitiyManager.query(`
        SELECT * FROM mohim.groups WHERE church = '${church}' and category = 'group'`);
  }

  async getServiceList(church: string) {
    const entitiyManager = getManager();
    return await entitiyManager.query(`
        SELECT * FROM mohim.groups WHERE church = '${church}' and category = 'service'`);
  }
}
