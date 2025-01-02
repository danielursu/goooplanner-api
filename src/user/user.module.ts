import { Module } from "@nestjs/common";
import { UserMapper } from "./user.mapper";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService, UserMapper],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {}
