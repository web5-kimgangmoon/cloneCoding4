import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class _Count {
  @ApiProperty({ name: 'replied_post', type: 'number' })
  replied_post: number;
}

export class Post_dto implements Post {
  @ApiProperty({ name: 'id', type: 'number', minimum: 1 })
  id: number;

  @ApiProperty({ name: 'writer_id', type: 'number', minimum: 1 })
  writer_id: number;

  @ApiProperty({ name: 'reply_id', type: 'number', minimum: 1, nullable: true })
  reply_id: number | null;

  // @ApiProperty({
  //   name: 'top_post_id',
  //   type: 'number',
  //   minimum: 1,
  //   nullable: true,
  // })
  // top_post_id: number | null;

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

  @ApiProperty({ name: '_count', type: () => _Count, description: '댓글수' })
  _count: { replied_post: number };
  //   Like: Like[];
  //   ViewDate: ViewDate[];
  //   repliedPost: Post[];
}

export class Posts_dto {
  @ApiProperty({ type: () => [Post_dto] })
  posts: Post_dto[];
}

export class Post_all_dto {
  @ApiProperty({
    oneOf: [
      { type: 'object', properties: {}, additionalProperties: true },
      { $ref: getSchemaPath(Post_dto) },
    ],
  })
  target: Post_dto | {};

  @ApiProperty({ type: () => [Post_dto] })
  replied_post: Post_dto[];
}
