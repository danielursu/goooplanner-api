import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		UserModule,
		PassportModule,
		// should change the secretkey
		JwtModule.register({ secret: "secretKey", signOptions: { expiresIn: "2m" } }),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
