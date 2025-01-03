import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AppDataSource } from './data-source.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module.js';
import { EventModule } from './event/event.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    AuthModule,
    HealthModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
