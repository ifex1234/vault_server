import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  uniqueIndex,
  serial,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, sql } from 'drizzle-orm';

export const prismaMigrations = pgTable('_prisma_migrations', {
  id: varchar({ length: 36 }).primaryKey().notNull(),
  checksum: varchar({ length: 64 }).notNull(),
  finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
  migrationName: varchar('migration_name', { length: 255 }).notNull(),
  logs: text(),
  rolledBackAt: timestamp('rolled_back_at', {
    withTimezone: true,
    mode: 'string',
  }),
  startedAt: timestamp('started_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer('applied_steps_count').default(0).notNull(),
});

export const user = pgTable(
  'User',
  {
    id: serial().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    email: text().unique().notNull(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    password: text().notNull(),
    pin: text(),
  },
  (table) => [
    uniqueIndex('User_email_key').using(
      'btree',
      table.email.asc().nullsLast().op('text_ops'),
    ),
  ],
);
export type User = InferSelectModel<typeof user>;

export const customer = pgTable(
  'Customer',
  {
    id: serial().primaryKey().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    email: text(),
    firstName: text().notNull(),
    lastName: text().notNull(),
    customerAddress: text(),
    customerBusinessAddress: text(),
    phoneNumber: integer(),
    phoneNumber2: integer(),
    bvn: integer('BVN'),
    nin: integer('NIN'),
    customerDob: timestamp({ precision: 3, mode: 'string' }),
    utilityBillUrl: text(),
    identificationUrl: text(),
    // nuban: integer(),
    creatorId: integer('creator_id')
      .notNull()
      .references(() => user.id),
  },
  (table) => [
    uniqueIndex('Customer_BVN_key').using(
      'btree',
      table.bvn.asc().nullsLast().op('int4_ops'),
    ),
    uniqueIndex('Customer_NIN_key').using(
      'btree',
      table.nin.asc().nullsLast().op('int4_ops'),
    ),
    uniqueIndex('Customer_email_key').using(
      'btree',
      table.email.asc().nullsLast().op('text_ops'),
    ),
    // uniqueIndex('Customer_nuban_key').using(
    //   'btree',
    //   table.nuban.asc().nullsLast().op('int4_ops'),
    // ),
    uniqueIndex('Customer_phoneNumber_key').using(
      'btree',
      table.phoneNumber.asc().nullsLast().op('int4_ops'),
    ),
  ],
);
