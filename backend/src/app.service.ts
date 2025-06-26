import { Injectable } from '@nestjs/common';
import { prisma } from './main';

@Injectable()
export class AppService {
  async getLike(): Promise<{ id: number; postId: number; userId: number }[]> {
    return await prisma.like.findMany();
  }

  async addLike(): Promise<void> {
    const user = await prisma.user.create({
      data: { email: 'kim', name: '', password: 'ks' },
    });
    const post = await prisma.post.create({
      data: { title: 'ds', content: 'ds' },
    });
    await prisma.like.create({ data: { userId: user.id, postId: post.id } });
    await prisma.viewDate.create({
      data: { writerId: user.id, postId: post.id, lastView: new Date() },
    });
  }
}
