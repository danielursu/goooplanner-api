import { Controller, UseGuards, Post, Get, Req, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { Request } from "express";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UserDTO } from "src/user/dto/user.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@UseGuards(LocalGuard)
	async login(@Req() req: Request) {
		return req.user;
	}

	@Post("register")
	async register(@Body() userDTO: UserDTO) {
		const user = await this.authService.register(userDTO);
		return this.authService.login(user);
	}

	@Get("status")
	@UseGuards(JwtAuthGuard)
	status(@Req() req: Request) {
		return req.user;
	}
}
