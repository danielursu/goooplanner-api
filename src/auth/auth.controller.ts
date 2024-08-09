import { Controller, UseGuards, Request, Res, Post, Body, HttpException } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { AuthPayloadDTO } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService, private jwtService: JwtService) {}

	@Post("login")
	async login(@Body() authPayload: AuthPayloadDTO, @Res() res: Response) {
		const user = await this.authService.validateUser(authPayload);
		if (user) {
			return res.status(200).json({ message: "Login successful" });
			// const { email, password } = user;
			// return {
			// 	access_token: this.jwtService.sign({ email, password }),
			// };
		} else {
			return res.status(401).json({ message: "Invalid email or password" });
		}
	}
}
