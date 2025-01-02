import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
	type: "postgres",
	host: configService.get("DB_HOST"),
	port: configService.get("DB_PORT"),
	username: configService.get("DB_USERNAME"),
	password: configService.get("DB_PASSWORD"),
	database: configService.get("DB_DATABASE"),
	entities: ["dist/**/*.entity{.ts,.js}"],
	migrations: ["dist/db/migrations/*.js"],
	synchronize: false,
});