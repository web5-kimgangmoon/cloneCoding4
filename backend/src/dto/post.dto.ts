import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostDto implements Post {
  @ApiProperty({ name: 'id', type: 'number', minimum: 1 })
  id: number;

  @ApiProperty({ name: 'writer_id', type: 'number', minimum: 1 })
  writer_id: number;

  @ApiProperty({ name: 'reply_id', type: 'number', minimum: 1, nullable: true })
  reply_id: number | null;

  @ApiProperty({
    name: 'content',
    type: 'string',
    minLength: 1,
    maxLength: 3000,
  })
  content: string;

  @ApiProperty({
    name: 'img_link',
    type: 'string',
    minLength: 1,
    maxLength: 1000,
    nullable: true,
  })
  img_link: string | null;

  @ApiProperty({ name: 'view_cnt', type: 'number', minLength: 0 })
  view_cnt: number;

  @ApiProperty({ name: 'created_at', type: 'string', format: 'date-time' })
  created_at: Date;

  @ApiProperty({ name: 'updated_at', type: 'string', format: 'date-time' })
  updated_at: Date;

  //   Like: Like[];
  //   ViewDate: ViewDate[];
  //   repliedPost: Post[];
}

export class PostsDto {
  @ApiProperty({ type: () => [PostsDto] })
  posts: PostsDto[];
}
