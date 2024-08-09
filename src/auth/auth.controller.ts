import { Controller, UseGuards, Post, Body, HttpException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthPayloadDTO } from "./dto/auth.dto";
import { LocalGuard } from "./guards/local.guard";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@UseGuards(LocalGuard)
	async login(@Body() authPayload: AuthPayloadDTO) {
		const user = await this.authService.validateUser(authPayload);
		if (!user) throw new HttpException("Invalid credentials", 401);
		return user;
	}
}
