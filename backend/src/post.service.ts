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
    return await prisma.post.findMany({
      where: writer_id ? { writer_id } : undefined,
    });
  }
  async findOne(id: number) {
    return await prisma.post.findUnique({ where: { id } });
  }
  async deletePost(id: number) {
    return await prisma.post.delete({ where: { id } });
  }
}
