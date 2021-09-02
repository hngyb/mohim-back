import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follows } from 'src/entities/Follows';
import { Repository } from 'typeorm';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followRepository: Repository<Follows>,
  ) {}

  async createFollow(groupId: number, userId: string) {
    const newFollow = new Follows();
    newFollow.GroupId = groupId;
    newFollow.UserId = userId;
    await this.followRepository.save(newFollow);
  }

  async getFollows(UserId: string) {
    return this.followRepository.find({
      where: { UserId },
      select: [
        'GroupId',
        'createdAt',
        'color',
        'isBelongTo',
        'updatedAt',
        'deletedAt',
      ],
    });
  }

  async changeColor(UserId: string, GroupId: number, color: string) {
    const followGroup = await this.followRepository.findOne({
      where: { UserId, GroupId },
    });
    followGroup.color = color;
    await this.followRepository.save(followGroup);
  }
}
