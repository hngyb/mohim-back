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
import { CreateFollowDto } from './dto/create-follow.dto';
import { FollowsService } from './follows.service';

@ApiTags('FOLLOWS')
@Controller('api/follows')
export class FollowsController {
  constructor(private followService: FollowsService) {}

  @ApiOperation({ summary: '팔로잉 그룹 생성하기' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createFollow(@Body() data, @Request() req) {
    const groupId = data.groupId;
    const userId = req.user.id;
    return await this.followService.createFollow(groupId, userId);
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
  async getBelongTos(@Request() req) {
    const userId = req.user.id;
    return await this.followService.getFollows(userId);
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
