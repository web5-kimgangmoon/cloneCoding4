import { Injectable } from '@nestjs/common';
import { prisma } from './main';

@Injectable()
export class UserService {
  async create(email: string, name: string, password: string) {
    return await prisma.user.create({ data: { email, name, password } });
  }
  async findOne(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  }
  async findAll(name: string) {
    return await prisma.user.findMany({
      where: { name: { contains: name }, email: { contains: name } },
    });
  }
}
