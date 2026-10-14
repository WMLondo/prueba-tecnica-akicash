import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import knex from 'knex';

export const KNEX_CONNECTION = 'KNEX_CONNECTION' as const;

export const KnexProvider: Provider = {
  inject: [ConfigService],
  provide: KNEX_CONNECTION,
  useFactory: (config: ConfigService) => {
    return knex({
      client: 'mysql2',
      connection: {
        host: config.getOrThrow<string>('DB_HOST'),
        port: config.getOrThrow<number>('DB_PORT'),
        user: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        database: config.getOrThrow<string>('DB_DATABASE'),
      },
    });
  },
};
