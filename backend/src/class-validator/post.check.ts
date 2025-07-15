import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class Post_create_query {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  reply?: number;
}

export class Post_body {
  @IsString()
  @MinLength(1)
  content: string;

  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  img?: string;

  // @IsInt()
  // id: number; // 테스트
}

export class Post_filer_query {
  @IsIn(['posts', 'replies', 'likes'])
  @IsString()
  list: 'posts' | 'replies' | 'likes' = 'posts';

  @IsIn(['own', 'notification'])
  @IsString()
  type: 'own' | 'notification' = 'own';
}

export class Post_param_postId {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  post_id: number;
}
