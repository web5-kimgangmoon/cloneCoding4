import { BadRequestException, Injectable } from '@nestjs/common';
import { prisma } from './main';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  async create(email: string, name: string, password: string) {
    if ((await prisma.user.findFirst({ where: { name } })) !== null)
      throw new BadRequestException('해당 이름을 가진 유저가 이미 존재합니다.');
    if ((await prisma.user.findFirst({ where: { email } })) !== null)
      throw new BadRequestException(
        '해당 이메일을 가진 유저가 이미 존재합니다.',
      );

    const hash_algorithm = crypto.createHash('sha256');

    const hashing = hash_algorithm.update(password + 'salt');
    const encrypted_password = hashing.digest('hex');
    return await prisma.user.create({
      data: { email, name, password: encrypted_password },
    });
  }
  async findOne(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  }
  async findAll(name: string) {
    return await prisma.user.findMany({
      where: { name: { contains: name }, email: { contains: name } },
    });
  }
  async login(id_str: string, password: string) {
    const hash_algorithm = crypto.createHash('sha256');
    const hashing = hash_algorithm.update(password + 'salt');
    const encrypted_password = hashing.digest('hex');

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ name: id_str }, { email: id_str }],
        password: encrypted_password,
      },
    });
    if (user === null)
      throw new BadRequestException('해당 유저는 존재하지 않습니다.');
    return user;
  }
}
