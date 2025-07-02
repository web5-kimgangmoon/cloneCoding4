import { Post } from './post.interface';
import { User } from './user.interface';

export interface Like {
  id: number;
  user_id: number;
  post_id: number;
  User: User;
  Post: Post;
}
