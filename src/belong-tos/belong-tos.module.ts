import { Module } from '@nestjs/common';
import { BelongTosService } from './belong-tos.service';
import { BelongTosController } from './belong-tos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Groups } from 'src/entities/Groups';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { BelongTos } from 'src/entities/BelongTos';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Groups, Events, Follows, BelongTos]),
  ],
  providers: [BelongTosService],
  controllers: [BelongTosController],
})
export class BelongTosModule {}
