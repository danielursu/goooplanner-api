import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UserDTO } from "./dto/user.dto";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("")
	async create(@Body() userDTO: UserDTO): Promise<User> {
		return this.userService.create(userDTO);
	}

	@Get("all")
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}
}
