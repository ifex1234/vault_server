import { relations } from 'drizzle-orm/relations';
import { customer, user } from './schema';

export const postsRelations = relations(customer, ({ one }) => ({
  author: one(user, {
    fields: [customer.creatorId],
    references: [user.id],
  }),
}));
