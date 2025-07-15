import { ApiProperty } from '@nestjs/swagger';
import { Like } from '@prisma/client';

export class Like_dto implements Like {
  @ApiProperty({ name: 'id', type: 'number', minimum: 1 })
  id: number;

  @ApiProperty({ name: 'user_id', type: 'number', minimum: 1 })
  user_id: number;

  @ApiProperty({ name: 'post_id', type: 'number', minimum: 1 })
  post_id: number;
}
