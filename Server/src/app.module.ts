import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Users } from './entities/Users';
import { Devices } from './entities/Devices';
import { Files } from './entities/Files';
import { FileShares } from './entities/FileShares';
import { FileVersions } from './entities/FileVersions';
import { SyncStates } from './entities/SyncStates';
import { RefreshTokens } from './entities/RefreshTokens';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: Number(config.get('POSTGRES_PORT')),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DATABASE'),
        schema: 'public',
        entities: [Users, Devices, Files, FileShares, FileVersions, SyncStates, RefreshTokens],
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: config.get('RUN_MIGRATIONS') === 'true',
        logging: config.get('MODE') === 'DEV',
      }),
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
