import { ApiProperty } from '@nestjs/swagger';
import { View_date } from '@prisma/client';

export class View_date_dto implements View_date {
  @ApiProperty({ name: 'id', type: 'number', minimum: 1 })
  id: number;

  @ApiProperty({ name: 'last_view', type: 'string', format: 'date-time' })
  last_view: Date;

  @ApiProperty({ name: 'writer_id', type: 'number', minimum: 1 })
  writer_id: number;

  @ApiProperty({ name: 'post_id', type: 'number', minimum: 1 })
  post_id: number;

  @ApiProperty({ name: 'viewer_id', type: 'number', minimum: 1 })
  viewer_id: number;
}
