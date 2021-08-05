import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BelongTos } from 'src/entities/BelongTos';
import { Repository } from 'typeorm';

@Injectable()
export class BelongTosService {
  constructor(
    @InjectRepository(BelongTos)
    private belongToRepository: Repository<BelongTos>,
  ) {}

  async createBelongTo(groupId: number, userId: string) {
    const newBelongTo = new BelongTos();
    newBelongTo.GroupId = groupId;
    newBelongTo.UserId = userId;
    await this.belongToRepository.save(newBelongTo);
  }

  async getBelongTos(UserId: string) {
    return this.belongToRepository.find({
      where: { UserId },
      select: ['GroupId', 'createdAt', 'updatedAt', 'deletedAt'],
    });
  }
}
