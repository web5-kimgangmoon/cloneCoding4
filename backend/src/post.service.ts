import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class PostService {
  private readonly users: User[] = [];
  async create() {}
  async update() {}
  async findAll() {}
  async findOne() {}
}
