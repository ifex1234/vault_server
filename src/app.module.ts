import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}
