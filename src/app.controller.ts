import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { User } from "./entities/user.entity";
import { UserService } from "./services/user.service";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly userService: UserService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get("all")
	getAll(): Promise<User[]> {
		return this.userService.findAll();
	}
}
