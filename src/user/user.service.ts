import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserDTO } from "./dto/user.dto";
import { UserMapper } from "./user.mapper";
import * as bcrypt from "bcryptjs";

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

	async findOne(email: string): Promise<User | undefined> {
		return this.userRepository.findOne({ where: { email } });
	}

	async create(userDTO: UserDTO): Promise<UserDTO> {
		const hashedPassword = await bcrypt.hash(userDTO.password, 10);
		const user = this.userRepository.create({ ...userDTO, password: hashedPassword });
		return this.userRepository.save(user);
	}
}
