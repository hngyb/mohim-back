import { PickType } from '@nestjs/swagger';
import { BelongTos } from 'src/entities/BelongTos';

export class CreateBelongToDto extends PickType(BelongTos, [
  'GroupId',
] as const) {}
