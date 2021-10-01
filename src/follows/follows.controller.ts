import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FollowsService } from './follows.service';

@ApiTags('FOLLOWS')
@Controller('api/follows')
export class FollowsController {
  constructor(private followService: FollowsService) {}

  @ApiOperation({ summary: '팔로잉 그룹 등록하기' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async registerFollow(@Body() data, @Request() req) {
    const groupId = data.groupId;
    const userId = req.user.id;
    return await this.followService.registerFollow(groupId, userId);
  }

  @ApiOperation({ summary: '소속 그룹 등록하기' })
  @UseGuards(JwtAuthGuard)
  @Post('belong-to')
  async registerBelongTo(@Body() data, @Request() req) {
    const groupId = data.groupId;
    const userId = req.user.id;
    return await this.followService.registerBelongTo(groupId, userId);
  }

  @ApiOperation({ summary: '팔로잉 그룹 삭제하기' })
  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async deleteFollow(@Body() data, @Request() req) {
    const groupId = data.groupId;
    const userId = req.user.id;
    return await this.followService.deleteFollow(groupId, userId);
  }

  @ApiOperation({ summary: '팔로잉 그룹 조회하기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllFollowingGroups(@Request() req) {
    const userId = req.user.id;
    return await this.followService.getAllFollowingGroups(userId);
  }

  @ApiOperation({ summary: '소속 그룹 조회하기' })
  @UseGuards(JwtAuthGuard)
  @Get('belong-to')
  async getBelongToGroups(@Request() req) {
    const userId = req.user.id;
    return await this.followService.getBelongToGroups(userId);
  }

  @ApiOperation({ summary: '소속 교회 조회하기' })
  @UseGuards(JwtAuthGuard)
  @Get('belong-to-church')
  async getBelongToChurch(@Request() req) {
    const userId = req.user.id;
    return await this.followService.getBelongToChurch(userId);
  }

  @ApiOperation({ summary: '팔로잉 그룹 색상 수정하기' })
  @UseGuards(JwtAuthGuard)
  @Post('color')
  async changeColor(@Request() req, @Body() data) {
    const color = data.color;
    const groupId = data.groupId;
    const userId = req.user.id;
    return await this.followService.changeColor(userId, groupId, color);
  }
}
