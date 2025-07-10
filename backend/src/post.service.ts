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
  async findAll(writer_id?: number) {
    // gpt
    await prisma.$queryRaw`
  SELECT p2.*
  FROM Post p1
  JOIN Post p2 ON p2.reply_id = p1.id
  WHERE p1.writer_id = ${writer_id}
    AND NOT EXISTS (
      SELECT 1 FROM View_date vd WHERE vd.post_id = p2.id
    )
`;

    return await prisma.post.findMany({
      where: writer_id ? { writer_id, View_date: { none: {} } } : undefined,
    });
  }
  async findOne(id: number) {
    return await prisma.post.findUnique({ where: { id } });
  }
  async deletePost(id: number) {
    return await prisma.post.delete({ where: { id } });
  }
}
