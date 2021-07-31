import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

// NestJS는 export default 하지 않고, 인터페이스 대신 클래스를 사용함
export class JoinRequestDto extends PickType(Users, [
  'email',
  'name',
  'password',
] as const) {}
