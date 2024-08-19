import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";

import { UserService } from "src/user/user.service";
import { AuthPayloadDTO } from "./dto/auth.dto";
import { UserDTO } from "src/user/dto/user.dto";

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	// method used to validate user in the local.strategy.ts
	async validateUser({ email, password }: AuthPayloadDTO): Promise<any> {
		const user = await this.userService.findOne(email);

		if (user && (await bcrypt.compare(password, user.password))) {
			const { password, ...result } = user;
			return {
				access_token: this.jwtService.sign(result),
				refresh_token: this.jwtService.sign(result, { expiresIn: "30d" }),
			};
		}
		return null;
	}

	// async login({ email, password }: AuthPayloadDTO) {
	// 	const payload = { email, password };
	// 	console.log("auth service payload: ", payload);
	// 	return {
	// 		access_token: this.jwtService.sign(payload),
	// 		refresh_token: this.jwtService.sign(payload, { expiresIn: "30d" }),
	// 	};
	// }

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
				access_token: this.jwtService.sign(newPayload),
			};
			console.log("new access_token", tokenPayload);
			return tokenPayload;
		} catch (error) {
			throw new UnauthorizedException("Invalid refresh token");
		}
	}
}
