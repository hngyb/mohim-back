import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';

@ApiTags('GROUPS')
@Controller('api/groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @ApiOperation({ summary: '그룹 생성하기' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createGroup(@Body() data: CreateGroupDto) {
    return await this.groupService.createGroup(data);
  }

  @ApiOperation({ summary: '그룹 ID 검색' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getGroupId(
    @Query('name') name: string,
    @Query('church') church: string,
  ) {
    return await this.groupService.getGroupId(name, church);
  }

  @ApiOperation({ summary: '교회 목록 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('church-list')
  async getChurchList() {
    return await this.groupService.getChurchList();
  }
}
