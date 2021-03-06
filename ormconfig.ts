import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Events } from 'src/entities/Events';
import { Follows } from 'src/entities/Follows';
import { Groups } from 'src/entities/Groups';
import { Manages } from 'src/entities/Manages';
import { Users } from './src/entities/Users';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Groups, Events, Follows, Manages],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  // autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false, // 서버 첫 시작일 때만 true
  logging: true,
  keepConnectionAlive: true,
  timezone: 'Asia/Seoul',
};

export = config;
