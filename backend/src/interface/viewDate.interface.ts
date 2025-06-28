import { Post } from './post.interface';
import { User } from './user.interface';

export interface ViewDate {
  id: number;
  lastView: Date;
  writerId: number;
  postId: number;
  Writer: User;
  Post: Post;
}
