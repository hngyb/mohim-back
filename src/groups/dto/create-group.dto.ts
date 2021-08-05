import { PickType } from '@nestjs/swagger';
import { Groups } from 'src/entities/Groups';

export class CreateGroupDto extends PickType(Groups, [
  'name',
  'church',
  'isPublic',
] as const) {}
