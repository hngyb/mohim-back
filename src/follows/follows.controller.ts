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
  async createEvent(@Body() data: CreateFollowDto, @Request() req) {
    const groupId = data.GroupId;
    const userId = req.user.id;
    return await this.followService.createFollow(groupId, userId);
  }

  @ApiOperation({ summary: '팔로잉 그룹 조회하기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getBelongTos(@Request() req) {
    const userId = req.user.id;
    return await this.followService.getFollows(userId);
  }
}