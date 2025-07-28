import { ApiProperty } from '@nestjs/swagger';
import { Post_like } from '@prisma/client';

export class Like_dto implements Post_like {
  @ApiProperty({ name: 'id', type: 'number', minimum: 1 })
  id: number;

  @ApiProperty({ name: 'user_id', type: 'number', minimum: 1 })
  user_id: number;

  @ApiProperty({ name: 'post_id', type: 'number', minimum: 1 })
  post_id: number;
}
