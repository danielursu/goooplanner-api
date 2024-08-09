import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	imports: [
		UserModule,
		PassportModule,
		// should change the secretkey
		JwtModule.register({ secret: "secretKey", signOptions: { expiresIn: "30m" } }),
	],
	providers: [AuthService, LocalStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
