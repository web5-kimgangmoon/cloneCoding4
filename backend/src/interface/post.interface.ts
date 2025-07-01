// import { Like } from './Like.interface';
// import { ViewDate } from './viewDate.interface';

export interface Post {
  id: number;
  writerId: number;
  replyId?: number;
  content: string;
  imgLink?: string;
  viewCnt: number;
  createdAt: Date;
  updatedAt: Date;
  // Like: Like[];
  // ViewDate: ViewDate[];
  // repliedPost: Post[];
}
