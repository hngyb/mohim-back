import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { BelongTosService } from './belong-tos.service';
import { CreateBelongToDto } from './dto/create-belongTo.dto';

@ApiTags('BELONGTOS')
@Controller('api/belong-tos')
export class BelongTosController {
  constructor(private belongToService: BelongTosService) {}

  @ApiOperation({ summary: '소속그룹 생성하기' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createEvent(@Body() data: CreateBelongToDto, @Request() req) {
    const groupId = data.GroupId;
    const userId = req.user.id;
    return await this.belongToService.createBelongTo(groupId, userId);
  }

  @ApiOperation({ summary: '소속그룹 조회하기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getBelongTos(@Request() req) {
    const userId = req.user.id;
    return await this.belongToService.getBelongTos(userId);
  }
}
