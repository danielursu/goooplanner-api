import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { ConfigService } from "@nestjs/config";

import { UserService } from "../user/user.service"; // Make sure this import is correct
import { AuthPayloadDTO } from "./dto/auth.dto";
import { UserDTO } from "../user/dto/user.dto";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	// method used to validate user in the local.strategy.ts
	async validateUser({ email, password }: AuthPayloadDTO): Promise<any> {
		const user = await this.userService.findOne(email);

		if (user && (await bcrypt.compare(password, user.password))) {
			const { password, ...result } = user;
			return {
				access_token: this.jwtService.sign(result, {
					expiresIn: this.configService.get<string>("JWT_EXPIRATION_TIME") || "1h",
				}),
				refresh_token: this.jwtService.sign(result, {
					expiresIn: this.configService.get<string>("REFRESH_TOKEN_EXPIRATION_TIME") || "7d",
				}),
			};
		}
		return null;
	}

	async register(userDTO: UserDTO) {
		const user = await this.userService.create(userDTO);
		return user;
	}

	// refresh token method, it is used to refresh access_token
	async refreshToken(refresh_token: string) {
		try {
			const decoded = this.jwtService.verify(refresh_token);

			const newPayload = {
				id: decoded.id,
				firstName: decoded.firstName,
				lastName: decoded.lastName,
				email: decoded.email,
			};
			const tokenPayload = {
				access_token: this.jwtService.sign(newPayload, {
					expiresIn: this.configService.get<string>("JWT_EXPIRATION_TIME") || "1h",
				}),
			};
			console.log("new access_token", tokenPayload);
			return tokenPayload;
		} catch (error) {
			throw new UnauthorizedException("Invalid refresh token");
		}
	}
}
