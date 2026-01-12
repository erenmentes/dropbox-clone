import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { RefreshTokens } from 'src/entities/RefreshTokens';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      RefreshTokens,
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
