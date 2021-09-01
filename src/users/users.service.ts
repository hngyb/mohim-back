import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Follows } from 'src/entities/Follows';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Follows)
    private followsRepository: Repository<Follows>,
    private authService: AuthService,
  ) {}

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });
  }

  async join(email: string, name: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const returned = await this.usersRepository.save({
      email,
      name,
      password: hashedPassword,
    });
  }

  async login(user: any) {
    const accessToken = await this.authService.getJwtAccessToken(user);
    const refreshToken = await this.authService.getJwtRefreshToken(user);

    await this.setCurrentRefreshToken(refreshToken, user.id);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      ...user,
    };
  }

  async refreshAccessToken(user: any) {
    const accessToken = await this.authService.getJwtAccessToken(user);
    return {
      accessToken: accessToken,
    };
  }

  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    await this.usersRepository.update(id, { currentHashedRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'currentHashedRefreshToken'],
    });
    const ifRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (ifRefreshTokenMatching) {
      const { currentHashedRefreshToken, ...userWithoutRefreshToken } = user;
      return userWithoutRefreshToken;
    }
  }

  async removeRefreshToken(id: number) {
    return this.usersRepository.update(id, { currentHashedRefreshToken: null });
  }

  async register(
    id: string,
    sex: 'brother' | 'sister',
    groupIds: Array<number>,
  ) {
    const colorPalettes = [
      '#B71C1C',
      '#FF8A80',
      '#A1887F',
      '#795548',
      '#C5E1A5',
      '#004D40',
      '#80D8FF',
      '#2979FF',
      '#E0E0E0',
      '#FFEB3B',
      '#E53935',
      '#0097A7',
      '#64B5F6',
      '#81D4FA',
      '#7986CB',
      '#FFF8E1',
      '#FFECB3',
      '#FFE082',
      '#DCE775',
      '#FF7043',
      '#FFEB3B',
      '#FFD180',
      '#BDBDBD',
      '#78909C',
      '#37474F',
    ];
    await this.usersRepository.update(id, { sex, isAuthorized: true });
    groupIds.forEach(async (groupId) => {
      await this.followsRepository.save({
        GroupId: groupId,
        UserId: id,
        isBelongTo: true,
        color: colorPalettes[Math.floor(Math.random() * colorPalettes.length)],
      });
    });
  }

  async isAuthorized(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'isAuthorized'],
    });
    return user;
  }
}
