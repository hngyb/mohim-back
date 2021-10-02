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

  @ApiOperation({ summary: '교회명과 그룹명으로 그룹 정보 검색' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getGroupInfoByName(
    @Query('name') name: string,
    @Query('church') church: string,
  ) {
    return await this.groupService.getGroupId(name, church);
  }

  @ApiOperation({ summary: '그룹 아이디로 그룹 정보 검색' })
  @UseGuards(JwtAuthGuard)
  @Get('group-info')
  async getGroupName(@Query('groupId') groupId: number) {
    return await this.groupService.getGroupName(groupId);
  }

  @ApiOperation({ summary: '교회 목록 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('church-list')
  async getChurchList() {
    return await this.groupService.getChurchList();
  }

  @ApiOperation({ summary: '전체 목록 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('all-list')
  async getAllList(@Query('church') church: string) {
    return await this.groupService.getAllList(church);
  }

  @ApiOperation({ summary: '구역 목록 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('district-list')
  async getDistrictList(@Query('church') church: string) {
    return await this.groupService.getDistrictList(church);
  }

  @ApiOperation({ summary: '부서 목록 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('department-list')
  async getDepartmentList(@Query('church') church: string) {
    return await this.groupService.getDepartmentList(church);
  }

  @ApiOperation({ summary: '봉사 목록 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get('service-list')
  async getServiceList(@Query('church') church: string) {
    return await this.groupService.getServiceList(church);
  }
}
