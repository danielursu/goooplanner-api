import { Controller, UseGuards, Post, Get, Body, HttpException, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPayloadDTO } from "./dto/auth.dto";
import { LocalGuard } from "./guards/local.guard";
import { Request } from "express";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@UseGuards(LocalGuard)
	// we do not need to validate user in the controller because we already did that in the local.strategy.ts
	// async login(@Body() authPayload: AuthPayloadDTO) {
	// 	const user = await this.authService.validateUser(authPayload);
	// 	if (!user) throw new HttpException("Invalid credentials", 401);
	// 	return user;
	// }
	async login(@Req() req: Request) {
		return req.user;
	}

	@Get("status")
	@UseGuards(JwtAuthGuard)
	status(@Req() req: Request) {
		return req.user;
	}
}
