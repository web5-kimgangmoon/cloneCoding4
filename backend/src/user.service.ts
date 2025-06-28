import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async create() {}
  async findOne() {}
  async findAll() {}
}
