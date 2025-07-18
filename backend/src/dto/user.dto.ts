import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class User_dto implements User {
  @ApiProperty({ name: 'id', type: 'number', minimum: 1 })
  id: number;

  @ApiProperty({ name: 'name', type: 'string', minLength: 1, maxLength: 30 })
  name: string;

  @ApiProperty({
    name: 'email',
    type: 'string',
    minLength: 1,
    maxLength: 100,
    format: 'email',
  })
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    minLength: 1,
    maxLength: 20,
    description:
      '암호화된 비밀번호로 실제 db에 저장될 경우는 256비트로 저장된다.',
  })
  password: string;

  @ApiProperty({ name: 'created_at', type: 'string', format: 'date-time' })
  created_at: Date;

  @ApiProperty({ name: 'updated_at', type: 'string', format: 'date-time' })
  updated_at: Date;

  // Like: Like[];
  // ViewDate: ViewDate[];
  // Post: Post[];
}

export class Users_dto {
  @ApiProperty({ type: () => [User_dto] })
  users: User_dto[];
}
