/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { dataSourceOptions } from "../db/data-source";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(dataSourceOptions), UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
