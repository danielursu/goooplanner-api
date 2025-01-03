import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { Event } from "./event/event.entity";
import { User } from "./user/user.entity";
import { join } from "path";

config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: configService.get("DB_HOST"),
  port: configService.get("DB_PORT"),
  username: configService.get("DB_USERNAME"),
  password: configService.get("DB_PASSWORD"),
  database: configService.get("DB_DATABASE"),
  entities: [Event, User],
  migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  migrationsRun: true,
  synchronize: false,
});
