import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: String(configService.get('TYPEORM_HOST')),
      port: Number(configService.get('TYPEORM_PORT')),
      username: String(configService.get('POSTGRES_USER')),
      password: String(configService.get('POSTGRES_PASSWORD')),
      database: String(configService.get('POSTGRES_DB')),
      autoLoadEntities:
        configService.get('TYPEORM_AUTO_LOAD_ENTITIES') === 'true'
          ? true
          : false,
      synchronize:
        configService.get('TYPEORM_SYNCHRONIZE') === 'true' ? true : false,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
