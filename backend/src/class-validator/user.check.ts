import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class User_filter_query {
  @IsString()
  name: string;
}

export class User_regist_body {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  pwd: string;
}

export class User_login_body {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  id_str: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  pwd: string;
}
