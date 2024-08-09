/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { dataSourceOptions } from "../db/data-source";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(dataSourceOptions), UserModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
