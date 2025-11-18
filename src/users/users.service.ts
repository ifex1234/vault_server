import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartialUser } from 'src/types/partial-user';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DRIZZLE_ORM') private db: NodePgDatabase<typeof schema>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const [newUser] = await this.db
      .insert(users)
      .values(createUserDto)
      .returning();
    return newUser;
  }

  async findByEmail(email: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  }

  async findById(id: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
    });
    return user;
  }

  async reset(update: UpdateUserDto) {
    const data = await this.db
      .update(users)
      .set({ password: update.password })
      .where(eq(users.email, update.email))
      .returning();

    return data;
  }

  async update(email: string, userData: PartialUser) {
    const [updatedUser] = await this.db
      .update(users)
      .set(userData)
      .where(eq(users.email, email))
      .returning();
    return updatedUser;
  }
}
