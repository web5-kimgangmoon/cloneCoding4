import { BadRequestException } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class Post_limit {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  limit: number = 10;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;
}

export class Post_create_query {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  reply?: number;
}

export class Post_body {
  @IsString()
  @MinLength(1)
  content: string;

  // @IsString()
  // @MinLength(1)
  // @MaxLength(1000)
  // img?: string;

  // @IsInt()
  // id: number; // 테스트
}

export class Post_filter_query extends Post_limit {
  @IsIn(['posts', 'replies', 'likes'])
  list: 'posts' | 'replies' | 'likes' = 'posts';

  @IsIn(['own', 'notification'])
  type: 'own' | 'notification' = 'own';
}

export class Post_param_postId {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  post_id: number;
}

export class Post_findOne_query extends Post_limit {
  @Transform(({ value }) => {
    if (value !== 'true' && value !== 'false') {
      throw new BadRequestException(
        "Invalid query value for 'hasPost', Expected 'true' or 'false'",
      );
    }
    return value === 'true';
  })
  @IsBoolean()
  @IsOptional()
  hasPost: boolean = true;

  @Transform(({ value }) => {
    if (value !== 'true' && value !== 'false') {
      throw new BadRequestException(
        "Invalid query value for 'hasReplies', Expected 'true' or 'false'",
      );
    }
    return value === 'true';
  })
  @IsBoolean()
  @IsOptional()
  hasReplies: boolean = true;
}
