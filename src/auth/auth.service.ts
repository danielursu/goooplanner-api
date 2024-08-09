import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcryptjs";
import { AuthPayloadDTO } from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService) {}

	async validateUser({ email, password }: AuthPayloadDTO): Promise<any> {
		const user = await this.userService.findOne(email);

		if (user && (await bcrypt.compare(password, user.password))) {
			const { password, ...result } = user;
			return this.jwtService.sign(result);
		}
		return null;
	}

	async login(user: AuthPayloadDTO) {
		const payload = user;
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	// async createRememberToken(user: any) {
	// 	const token = this.jwtService.sign({ email: user.email, sub: user.userId }, { expiresIn: "30d" });
	// 	await this.userService.setRememberToken(user.id, token);
	// 	return token;
	// }
}
