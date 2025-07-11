import { Type } from 'class-transformer';
import { IsIn, IsString } from 'class-validator';

export class filer_query {
  @Type(() => String)
  @IsIn(['posts', 'replies', 'likes'])
  @IsString()
  list: 'posts' | 'replies' | 'likes';

  @Type(() => String)
  @IsIn(['own', 'notification'])
  @IsString()
  type: 'own' | 'notification';
}
