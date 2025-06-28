import { Post } from './post.interface';
import { User } from './user.interface';

export interface Like {
  id: number;
  userId: number;
  postId: number;
  User: User;
  Post: Post;
}
