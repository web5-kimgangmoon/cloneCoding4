import { Injectable } from '@nestjs/common';
import { prisma } from './main';

@Injectable()
export class PostService {
  async create(
    content: string,
    writer_id: number,
    img_link?: string,
    reply_id?: number,
  ) {
    return await prisma.post.create({
      data: { content, img_link, writer_id, reply_id },
    });
  }
  async update(id: number, content: string, img_link: string) {
    return await prisma.post.update({
      where: { id },
      data: { content, img_link },
    });
  }
  async findAll() {
    return await prisma.post.findMany();
  }
  async filter(
    type: 'own' | 'notification',
    list: 'posts' | 'replies' | 'likes',
    user_id?: number,
  ) {
    // gpt(Post 별칭 p1과 p2 테이블을 join하고 p2의 reply_id와 id가 같은 것끼리 링킹하고 where로 조건을 추가한다.)

    if (type === 'own') {
      switch (list) {
        case 'posts':
          // 자신이 쓴 게시글
          await prisma.post.findMany({ where: { writer_id: user_id } });
          break;
        case 'replies':
          // 자신이 쓴 댓글
          await prisma.post.findMany({
            where: { AND: { writer_id: user_id, reply_id: { not: null } } },
          });
          break;
        case 'likes':
          // 자신이 추천한 게시글 혹은 댓글
          await prisma.$queryRaw`
          SELECT Post.*
          FROM Post
          JOIN Like ON Like.post_id = Post.id
          WHERE Like.user_id = ${user_id}`;
          break;
      }
    }

    if (type === 'notification') {
      switch (list) {
        case 'posts':
          //  자신이 쓴 게시글에 다른 사람이 달아준 댓글
          await prisma.$queryRaw`
  SELECT p2.*
  FROM Post p1
  JOIN Post p2 ON p2.reply_id = p1.id
  WHERE p1.writer_id = ${user_id}
    AND NOT EXISTS (
      SELECT 1 FROM View_date vd WHERE vd.post_id = p2.id
    )
`;
          break;
        case 'replies':
          //  자신이 쓴 댓글에 다른 사람이 달아준 댓글
          await prisma.$queryRaw`
  SELECT p2.*
  FROM Post p1
  JOIN Post p2 ON p2.reply_id = p1.id
  WHERE p1.reply_id IS NOT NULL
    AND p1.writer_id = ${user_id}
    AND NOT EXISTS (
      SELECT 1 FROM View_date vd WHERE vd.post_id = p2.id
    )
`;
          break;
      }
    }
  }
  async findOne(id: number) {
    return await prisma.post.findUnique({ where: { id } });
  }
  async deletePost(id: number) {
    return await prisma.post.delete({ where: { id } });
  }
}
