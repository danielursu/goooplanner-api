import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName?: string;

  @IsEmail()
  email?: string;
}

export class UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
