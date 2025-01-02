import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class UserMapper {
  toEntity(createUserDto: CreateUserDto): User {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return user;
  }

  toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  updateEntity(user: User, updateUserDto: UpdateUserDto): User {
    const updatedUser = new User(user);
    if (updateUserDto.firstName) {
      updatedUser.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      updatedUser.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.email) {
      updatedUser.email = updateUserDto.email;
    }
    return updatedUser;
  }
}
