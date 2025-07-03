import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class Reply_id_query {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  reply?: number;
}
