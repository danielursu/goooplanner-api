import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserDTO } from "src/user/user.dto";
import { UserMapper } from "./user.mapper";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly userMapper: UserMapper,
	) {}

	async findAll(): Promise<UserDTO[]> {
		const users: User[] = await this.userRepository.find();
		return this.userMapper.toDTOs(users);
	}
}
