import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
