import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../config';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, UsersModule, JwtModule.register({
    secret: config.jwt_secret_key,
    signOptions: {
      expiresIn: '30m',
    },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
