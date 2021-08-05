import { PickType } from '@nestjs/swagger';
import { Follows } from 'src/entities/Follows';

export class CreateFollowDto extends PickType(Follows, ['GroupId'] as const) {}
