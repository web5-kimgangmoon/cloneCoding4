import { Like } from './Like.interface';
import { ViewDate } from './viewDate.interface';

export interface Post {
  id: number;
  title: string;
  content: string;
  imgLink?: string;
  viewCnt: number;
  createdAt: Date;
  updatedAt: Date;
  Like: Like[];
  ViewDate: ViewDate[];
}
