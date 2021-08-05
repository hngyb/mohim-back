import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { AuthModule } from 'src/auth/auth.module';
import { Groups } from 'src/entities/Groups';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { BelongTos } from 'src/entities/BelongTos';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Groups, Events, Follows, BelongTos]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
