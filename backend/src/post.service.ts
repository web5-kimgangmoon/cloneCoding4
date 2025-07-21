import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { prisma } from './main';
import { basename, extname } from 'path';
import { unlink } from 'fs';

@Injectable()
export class Post_service {
  async create(
    content: string,
    writer_id: number,
    img_link?: string,
    reply_id?: number,
  ) {
    if (
      reply_id &&
      (await prisma.post.findFirst({ where: { id: reply_id } })) === null
    ) {
      throw new BadRequestException('reply post does not exists.');
    }
    return await prisma.post.create({
      data: { content, img_link, writer_id, reply_id },
    });
  }
  async update(
    id: number,
    user_id: number,
    content: string,
    img_link?: string,
  ) {
    const target = await prisma.post.findFirst({
      where: { id },
    });
    if (target === null)
      throw new NotFoundException('해당 게시글이 존재하지 않습니다.');
    if (target.writer_id !== user_id)
      throw new UnauthorizedException('해당 게시글의 작성자가 아닙니다.');
    if (img_link && target.img_link !== null && img_link !== target.img_link) {
      unlink(
        './imgs/' + basename(target.img_link, extname(target.img_link)),
        (err) => {
          if (err !== null)
            console.error('image deleting is failed, detailed error:\n', err);
        },
      );
    }
    // 구조분해 연산자 이용.
    await prisma.post.update({
      where: { id },
      data: { content, ...(img_link ? { img_link } : {}) },
    });
  }
  async like(post_id: number, user_id: number) {
    let result: boolean = false;
    const target = await prisma.post_like.findFirst({
      where: { AND: { post_id, user_id } },
    });
    if (target) {
      await prisma.post_like.delete({
        where: { id: target.id },
      });
      result = false;
    } else {
      await prisma.post_like.create({ data: { post_id, user_id } });
      result = true;
    }
    return result;
  }
  async findAll() {
    return await prisma.post.findMany({ where: { reply_id: null } });
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
          return await prisma.post.findMany({
            where: { writer_id: user_id, reply_id: null },
          });
        case 'replies':
          // 자신이 쓴 댓글
          return await prisma.post.findMany({
            where: { AND: { writer_id: user_id, reply_id: { not: null } } },
          });
        case 'likes':
          // 자신이 추천한 게시글 혹은 댓글
          return await prisma.$queryRaw`
          SELECT Post.*
          FROM Post
          JOIN Post_like ON Post_like.post_id = Post.id
          WHERE Post_like.user_id = ${user_id}`;
      }
    }

    if (type === 'notification') {
      switch (list) {
        case 'posts':
          //  자신이 쓴 게시글에 다른 사람이 달아준 댓글
          return await prisma.$queryRaw`
  SELECT p2.*
  FROM Post p1
  JOIN Post p2 ON p2.reply_id = p1.id
  WHERE p1.writer_id = ${user_id}
    AND p2.created_at < (
      SELECT last_view FROM View_date vd WHERE vd.post_id = p1.id
    )
`; // 3개 조인으로 수정필요.
        case 'replies':
          //  자신이 쓴 댓글에 다른 사람이 달아준 댓글
          return await prisma.$queryRaw`
  SELECT p2.*
  FROM Post p1
  JOIN Post p2 ON p2.reply_id = p1.id
  WHERE p1.reply_id IS NOT NULL
    AND p1.writer_id = ${user_id}
    AND NOT EXISTS (
      SELECT 1 FROM View_date vd WHERE vd.post_id = p2.id
    )
`;
      }
    }
  }
  async findOne(id: number) {
    const target = await prisma.post.findFirst({
      where: { id, reply_id: null },
      include: { replied_post: {} },
    });
    if (target === null)
      throw new BadRequestException('The post does not exists.');

    const updated = await prisma.post.update({
      data: { view_cnt: { increment: 1 } },
      where: { id },
      include: { replied_post: {} },
    });
    return updated;
  }
  async deletePost(id: number, user_id: number) {
    const target = await prisma.post.findFirst({ where: { id } });
    if (target === null)
      throw new BadRequestException('that post does not exists.');
    if (target.writer_id !== user_id)
      throw new UnauthorizedException("you don't have authority.");
    if (target.img_link) {
      unlink(
        './imgs/' + basename(target.img_link, extname(target.img_link)),
        (err) => {
          if (err !== null)
            console.error('image deleting is failed, detailed error:\n', err);
        },
      );
    }
    return await prisma.post.delete({ where: { id } });
  }
}
