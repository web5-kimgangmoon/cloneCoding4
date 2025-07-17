import { IsString } from 'class-validator';

export class Img_find_img_query {
  @IsString()
  img: string;
}
