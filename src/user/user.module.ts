import { Module } from "@nestjs/common";
import { UserMapper } from "./user.mapper";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService, UserMapper],
})
export class UserModule {}
