import { Injectable } from '@nestjs/common';
import { prisma } from './main';

@Injectable()
export class PostService {
  async create(content: string, writerId: number, imgLink?: string) {
    return await prisma.post.create({
      data: { content, imgLink, writerId },
    });
  }
  async update(id: number, content: string, imgLink: string) {
    return await prisma.post.update({
      where: { id },
      data: { content, imgLink },
    });
  }
  async findAll(writerId?: number) {
    return await prisma.post.findMany({
      where: writerId ? { writerId } : undefined,
    });
  }
  async findOne(id: number) {
    return await prisma.post.findUnique({ where: { id } });
  }
  async deletePost(id: number) {
    return await prisma.post.delete({ where: { id } });
  }
}
