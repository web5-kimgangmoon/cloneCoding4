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
  //   private async search_top(reply_id: number): Promise<number | null> {
  //     const result: { id: number }[] =
  //       await prisma.$queryRaw`WITH RECURSIVE cte (id, reply_id) as (
  // 	select id, reply_id
  // 	from Post
  // 	where id=${reply_id}

  // 	union all

  // 	select p.id, p.reply_id
  // 	from Post p
  // 	join cte on p.id = cte.reply_id
  // )
  // select id from cte where reply_id IS NULL LIMIT 1;
  // `;
  //     return result.length > 0 ? result[0].id : null;
  //   }
  async create(
    content: string,
    writer_id: number,
    img_link?: string,
    reply_id?: number,
  ) {
    // let top_post_id: null | number = null;
    if (reply_id) {
      // top_post_id = await this.search_top(reply_id);
      // if (!top_post_id)
      if ((await prisma.post.findFirst({ where: { id: reply_id } })) === null)
        throw new BadRequestException('reply post does not exists.');
    }

    return await prisma.post.create({
      data: {
        content,
        img_link,
        writer_id,
        reply_id,
        // top_post_id
      },
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
    if ((await prisma.post.findFirst({ where: { id: post_id } })) === null)
      throw new BadRequestException('the post does not exists.');
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
  async findAll({ limit, offset }: { limit: number; offset: number }) {
    return await prisma.post.findMany({
      where: { reply_id: null },
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: { _count: { select: { replied_post: true } } },
    });
  }
  async filter(
    type: 'own' | 'notification',
    list: 'posts' | 'replies' | 'likes',
    { limit, offset }: { limit: number; offset: number },
    user_id?: number,
  ) {
    // gpt(Post 별칭 p1과 p2 테이블을 join하고 p2의 reply_id와 id가 같은 것끼리 링킹하고 where로 조건을 추가한다.)
    let result: { [key: string]: any }[] = [];
    if (type === 'own') {
      switch (list) {
        case 'posts':
          // 자신이 쓴 게시글
          return await prisma.post.findMany({
            where: { writer_id: user_id, reply_id: null },
            skip: offset,
            take: limit,
            orderBy: { created_at: 'desc' },
            include: { _count: { select: { replied_post: true } } },
          });
        case 'replies':
          // 자신이 쓴 댓글
          return await prisma.post.findMany({
            where: { AND: { writer_id: user_id, reply_id: { not: null } } },
            skip: offset,
            take: limit,
            orderBy: { created_at: 'desc' },
            include: { _count: { select: { replied_post: true } } },
          });
        case 'likes':
          // 자신이 추천한 게시글 혹은 댓글
          result = await prisma.$queryRaw`
          SELECT Post.*, IFNULL(c.cmtCnt, 0) as cmtCnt
          FROM Post p
          JOIN Post_like pl ON pl.post_id = p.id
          LEFT JOIN (
            SELECT reply_id, COUNT(*) as cmtCnt
            FROM Post
            WHERE reply_id IS NOT NULL
            GROUP BY reply_id
          ) c on c.reply_id = p.id
          WHERE p.user_id = ${user_id} ORDER BY p.created_at DESC LIMIT ${offset}, ${limit} `;
          return result.map((value) => ({
            ...value,
            _count: { replied_post: value.cmtCnt },
          }));
      }
    }

    if (type === 'notification') {
      switch (list) {
        case 'posts':
          //  자신이 쓴 게시글에 다른 사람이 달아준 댓글
          result = await prisma.$queryRaw`
  SELECT p2.*, IFNULL(c.cmtCnt, 0) as cmtCnt
  FROM Post p1
  JOIN Post p2 ON p2.reply_id = p1.id
  LEFT JOIN View_date vd ON p1.id = vd.post_id
  LEFT JOIN (
    SELECT reply_id, COUNT(*) as cmtCnt
    FROM Post
    GROUP BY reply_id
  ) c ON c.reply_id = p2.id
  WHERE p1.writer_id = ${user_id}
    AND p1.reply_id IS NULL
    AND p2.writer_id != ${user_id}
    AND (vd.last_view IS NULL
    OR p2.created_at > vd.last_view) ORDER BY p2.created_at DESC LIMIT ${offset}, ${limit}
`;
          return result.map((value) => ({
            ...value,
            _count: { replied_post: value.cmtCnt },
          }));
        case 'replies':
          //  자신이 쓴 댓글에 다른 사람이 달아준 댓글
          result = await prisma.$queryRaw`
  SELECT p2.*, IFNULL(c.cmtCnt, 0) as cmtCnt
  FROM Post p1
  JOIN Post p2 ON p2.reply_id = p1.id
  LEFT JOIN View_date vd ON p1.id = vd.post_id
  LEFT JOIN (
    SELECT reply_id, COUNT(*) as cmtCnt
    FROM Post
    GROUP BY reply_id
  ) c ON c.reply_id = p2.id
  WHERE p1.writer_id = ${user_id}
    AND p1.reply_id != NULL
    AND p2.writer_id != ${user_id}
    AND (vd.last_view IS NULL
    OR p2.created_at > vd.last_view) ORDER BY p2.created_at DESC LIMIT ${offset}, ${limit}
`;
          return result.map((value) => ({
            ...value,
            _count: { replied_post: value.cmtCnt },
          }));
      }
    }
  }
  async findOne(
    id: number,
    {
      limit,
      offset,
      hasPost,
      hasReplies,
    }: { limit: number; offset: number; hasPost: boolean; hasReplies: boolean },
    user_id?: number,
  ) {
    const target = await prisma.post.findFirst({
      where: { id },
    });
    if (target === null)
      throw new BadRequestException('The post does not exists.');

    if (user_id) {
      const view_date = await prisma.view_date.findFirst({
        where: {
          post_id: id,
          writer_id: target.writer_id,
          viewer_id: user_id,
        },
      });

      if (view_date === null)
        await prisma.view_date.create({
          data: {
            post_id: id,
            writer_id: target.writer_id,
            viewer_id: user_id,
            last_view: new Date(),
          },
        });
      else
        await prisma.view_date.update({
          data: { last_view: new Date() },
          where: { id: view_date.id },
        });
    }
    const updated = await prisma.post.update({
      data: { view_cnt: { increment: 1 } },
      where: { id },
      include: {
        _count: { select: { replied_post: true } },
        replied_post: {
          orderBy: { created_at: 'desc' },
          skip: offset,
          take: limit,
          include: { _count: { select: { replied_post: true } } },
        },
      },
    });

    return {
      target: hasPost ? { ...updated, replied_post: undefined } : {},
      replied_post: hasReplies ? updated.replied_post : [],
    };
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
