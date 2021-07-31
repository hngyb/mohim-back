import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtRefreshGuard } from 'src/auth/jwt-refresh.guart';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: '내 정보 가져오기 ' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    return req.user || false;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async join(@Body() data: JoinRequestDto) {
    const user = await this.userService.findByEmail(data.email);
    if (user) {
      throw new ConflictException();
    }
    await this.userService.join(data.email, data.name, data.password);
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = req.user;
    return await this.userService.login(user);
  }

  @ApiOperation({ summary: 'Refresh 토큰 재발급' })
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Request() req) {
    const user = req.user;
    return await this.userService.login(user);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logOut() {}
}
