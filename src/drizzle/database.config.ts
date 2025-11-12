import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';

export const drizzleFactory = {
  provide: 'DRIZZLE_ORM',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const pool = new Pool({
      connectionString: configService.get<string>('DATABASE_URL'),
    });
    return drizzle(pool, { schema });
  },
};
