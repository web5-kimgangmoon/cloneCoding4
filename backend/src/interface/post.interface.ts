// import { Like } from './Like.interface';
// import { ViewDate } from './viewDate.interface';

export interface Post {
  id: number;
  writer_id: number;
  reply_id?: number;
  content: string;
  img_link?: string;
  view_cnt: number;
  created_at: Date;
  updated_at: Date;
  // Like: Like[];
  // ViewDate: ViewDate[];
  // repliedPost: Post[];
}
