import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";

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
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
