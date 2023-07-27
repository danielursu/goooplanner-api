import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async findAll(): Promise<User[]> {
		const users: User[] = await this.userRepository.find();
		return users;
	}

	async getNumberOfUsers(): Promise<number> {
		const [users, nr] = await this.userRepository.findAndCount();
		return users.length;
	}
}
