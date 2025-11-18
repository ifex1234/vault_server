import { InferInsertModel } from 'drizzle-orm';
import { users } from 'drizzle/schema';

// This type infers the structure for inserting data into the 'users' table.
// By making it Partial, we allow updating only a subset of fields.
export type PartialUser = Partial<InferInsertModel<typeof users>>;
