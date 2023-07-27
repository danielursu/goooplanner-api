import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UserService } from "./services/user.service";
import { User } from "./entities/user.entity";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "010920",
			database: "goooplanner",
			entities: ["dist/**/*.entity{.ts,.js}"],
		}),
		TypeOrmModule.forFeature([User]),
	],
	controllers: [AppController],
	providers: [AppService, UserService],
})
export class AppModule {}
