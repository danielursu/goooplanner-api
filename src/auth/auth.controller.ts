import { Controller, UseGuards, Post, Get, Req, Body } from "@nestjs/common";
import { Request } from "express";

import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UserDTO } from "src/user/dto/user.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@UseGuards(LocalGuard)
	async login(@Req() req: Request) {
		console.log("hit auth.controller.ts login: ", req.user);
		return req.user;
	}

	@Post("register")
	async register(@Body() userDTO: UserDTO) {
		const user = await this.authService.register(userDTO);
		console.log(user);
		return this.authService.login(user);
	}

	// method to check the token status, if it is expired or not
	@Get("status")
	@UseGuards(JwtAuthGuard)
	status(@Req() req: Request) {
		return req.user;
	}

	// refresh token endpoint, it is used to refresh access_token
	@Post("refresh")
	async refresh(@Body("refresh_token") refreshToken: string) {
		return await this.authService.refreshToken(refreshToken);
	}
}
