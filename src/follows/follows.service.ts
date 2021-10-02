import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { colorPalettes } from 'src/assets/color.palettes';
import { Follows } from 'src/entities/Follows';
import { createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followRepository: Repository<Follows>,
  ) {}

  async registerFollow(groupId: number, userId: string) {
    return await this.followRepository.save({
      GroupId: groupId,
      UserId: userId,
      isBelongTo: false,
      color: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
    });
  }

  async registerBelongTo(groupId: number, userId: string) {
    return await this.followRepository.save({
      GroupId: groupId,
      UserId: userId,
      isBelongTo: true,
      color: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
    });
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

  async getAllFollowingGroups(UserId: string) {
    const query = createQueryBuilder('follows', 'f')
      .innerJoinAndSelect('f.FollowGroup', 'g')
      .where('f.UserId = :UserId', { UserId });
    const result = await query.getMany();
    return result;
  }

  async getBelongToGroups(UserId: string) {
    const query = createQueryBuilder('follows', 'f')
      .innerJoinAndSelect('f.FollowGroup', 'g')
      .where('f.UserId = :UserId and f.isBelongTo = true', { UserId });
    const result = await query.getMany();
    return result;
  }

  async getBelongToChurch(UserId: string) {
    const query = createQueryBuilder('follows', 'f')
      .innerJoinAndSelect('f.FollowGroup', 'g')
      .where(
        'f.UserId = :UserId and f.isBelongTo = true and g.category = "church"',
        { UserId },
      );
    const result = await query.getOne();
    return result;
  }

  async changeColor(UserId: string, GroupId: number, color: string) {
    const followGroup = await this.followRepository.findOne({
      where: { UserId, GroupId },
    });
    followGroup.color = color;
    await this.followRepository.save(followGroup);
  }

  async deleteFollow(GroupId: number, UserId: string) {
    this.followRepository.delete({
      GroupId: GroupId,
      UserId: UserId,
    });
  }
}
