import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: 'メールアドレスは必須です。' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'パスワードは必須です。' })
  @MinLength(6, {
    message: 'パスワードは6文字以上、16文字以下です。',
  })
  @MaxLength(16, {
    message: 'パスワードは6文字以上、16文字以下です。',
  })
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty({ message: 'パスワードは必須です。' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'パスワードは必須です。' })
  @MinLength(6, {
    message: 'パスワードは6文字以上、16文字以下です。',
  })
  @MaxLength(16, {
    message: 'パスワードは6文字以上、16文字以下です。',
  })
  password: string;
}
