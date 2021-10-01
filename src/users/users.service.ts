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
