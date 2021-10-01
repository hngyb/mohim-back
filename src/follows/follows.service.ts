import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follows } from 'src/entities/Follows';
import { createQueryBuilder, getManager, Repository } from 'typeorm';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follows)
    private followRepository: Repository<Follows>,
  ) {}

  async registerFollow(groupId: number, userId: string) {
    const colorPalettes = [
      '#E53935', // Red 600
      '#E57373', // Red 300
      '#FF8A80', // Red A100
      '#D81B60', // Pink 600
      '#FF80AB', // Pink A100
      '#FF7043', // Deep Orange 400
      '#F57C00', // Orange 700
      '#FFAB91', // Deep Orange 200
      '#FFD740', // Amber A200
      '#FFD180', // Orange A100
      '#004D40', // Teal 900
      '#0097A7', // Cyan 700
      '#26A69A', // Teal 400
      '#AED581', // Light Green 300
      '#D4E157', // Lime 400
      '#2979FF', // Blue A400
      '#64B5F6', // Blue 300
      '#80D8FF', // Light BLue A100
      '#37474F', // Blue Gray 800
      '#78909C', // Blue Gray 400
      '#616161', // Gray 700
      '#BDBDBD', // Gray 400
      '#3E2723', // Brown 900
      '#795548', // Brown 500
      '#A1887F', // Brown 300
    ];
    return await this.followRepository.save({
      GroupId: groupId,
      UserId: userId,
      isBelongTo: false,
      color: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
    });
  }

  async registerBelongTo(groupId: number, userId: string) {
    const colorPalettes = [
      '#E53935', // Red 600
      '#E57373', // Red 300
      '#FF8A80', // Red A100
      '#D81B60', // Pink 600
      '#FF80AB', // Pink A100
      '#FF7043', // Deep Orange 400
      '#F57C00', // Orange 700
      '#FFAB91', // Deep Orange 200
      '#FFD740', // Amber A200
      '#FFD180', // Orange A100
      '#004D40', // Teal 900
      '#0097A7', // Cyan 700
      '#26A69A', // Teal 400
      '#AED581', // Light Green 300
      '#D4E157', // Lime 400
      '#2979FF', // Blue A400
      '#64B5F6', // Blue 300
      '#80D8FF', // Light BLue A100
      '#37474F', // Blue Gray 800
      '#78909C', // Blue Gray 400
      '#616161', // Gray 700
      '#BDBDBD', // Gray 400
      '#3E2723', // Brown 900
      '#795548', // Brown 500
      '#A1887F', // Brown 300
    ];
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
