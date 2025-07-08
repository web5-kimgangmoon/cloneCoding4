import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserDto implements User {
  @ApiProperty({ name: 'id', type: 'number', minimum: 1 })
  id: number;

  @ApiProperty({ name: 'name', type: 'string', minLength: 1, maxLength: 30 })
  name: string;

  @ApiProperty({ name: 'email', type: 'string', minLength: 1, maxLength: 100 })
  email: string;

  @ApiProperty({
    name: 'password',
    type: 'string',
    minLength: 1,
    maxLength: 20,
  })
  password: string;

  @ApiProperty({ name: 'created_at', type: 'string', format: 'Date' })
  created_at: Date;

  @ApiProperty({ name: 'updated_at', type: 'string', format: 'Date' })
  updated_at: Date;

  // Like: Like[];
  // ViewDate: ViewDate[];
  // Post: Post[];
}
