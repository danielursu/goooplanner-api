import { Controller, UseGuards, Post, Get, Req, Body, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";

import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { UserDTO } from "src/user/dto/user.dto";

export interface User {
	id: number;
	username: string;
	password: string;
	refresh_token?: string;
}

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("login")
	@UseGuards(LocalGuard)
	async login(@Req() req: Request, @Res() res: Response) {
		const user = req.user as User;
		const refreshToken = user.refresh_token;

		// calcular the expiration
		const decodedToken: { exp: number } = jwtDecode(refreshToken);
		const exp = decodedToken.exp;
		const currentTime = Math.floor(Date.now() / 1000);
		const maxAge = (exp - currentTime) * 1000;

		res.cookie("refresh_token", refreshToken, {
			httpOnly: false, // switch to true
			secure: false, // switch to true
			sameSite: "strict",
			maxAge: maxAge,
			path: "/",
		});
		console.log("Request object: ", req.user);
		return res.json(req.user);
	}

	// log out on the server, so I can remove the refresh_token from the cookies
	@Post("logout")
	async logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie("refresh_token", {
			httpOnly: false, // switch to true
			secure: false, // switch to true
			sameSite: "strict",
			path: "/",
		});

		return { message: "Logged out successfully" };
	}

	@Get("get-cookie")
	getCookie(@Req() request: Request) {
		const value = request.cookies["refresh_token"];
		return value;
	}

	@Post("register")
	async register(@Body() userDTO: UserDTO) {
		const user = await this.authService.register(userDTO);
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
