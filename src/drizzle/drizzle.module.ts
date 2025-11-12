/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import * as schema from '../../drizzle/schema';

// export const DRIZZLE = Symbol('drizzle-connection');
// @Module({
//   providers: [
//     {
//       provide: DRIZZLE,
//       inject: [ConfigService],
//       // eslint-disable-next-line @typescript-eslint/require-await
//       useFactory: async (configService: ConfigService) => {
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
//         const databaseUrl = configService.get<string>('DATABASE_URL');
//         if (typeof databaseUrl !== 'string') {
//           throw new Error('DATABASE_URL is not defined or not a string');
//         }
//         const pool = new Pool({
//           connectionString: databaseUrl,
//           ssl: true,
//         });
//         return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
//       },
//     },
//   ],
//   exports: [DRIZZLE],
// })
// export class DrizzleModule {}
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { drizzleFactory } from './database.config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [drizzleFactory],
  exports: ['DRIZZLE_ORM'],
})
export class DrizzleModule {}
