// import { Post } from '@prisma/client';
// import { Like } from './Like.interface';
// import { ViewDate } from './viewDate.interface';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  // Like: Like[];
  // ViewDate: ViewDate[];
  // Post: Post[];
}
