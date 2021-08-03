import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    // verify password
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async getJwtAccessToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    });
    return accessToken;
  }

  async getJwtRefreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });
    return refreshToken;
  }
}
