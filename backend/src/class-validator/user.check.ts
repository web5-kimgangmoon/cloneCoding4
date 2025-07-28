import {
  IsAlpha,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @IsAlpha()
  name: string;

  @IsString()
  @Matches(
    /^[A-Za-z0-9~!@#\$%\^&\*\(\)_\-=\+\\\|\[\]\{\}<>,.;':"\/\?]{3,20}$/,
    { message: 'length is in range, 3 ~ 20.' },
  )
  @Matches(/[A-Za-z]/, { message: 'least need one alphabet.' })
  @Matches(/[0-9]/, { message: 'least need one number.' })
  @Matches(/[~!@#\$%\^&\*\(\)_\-=\+\\\|\[\]\{\}<>,.;':"\/\?]/, {
    message: 'least need one section sigh.',
  })
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
