import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { user as users } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';

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
    const user = await this.db.query.user.findFirst({
      where: eq(users.email, email),
    });
    return user;
  }

  async findById(id: number) {
    const user = await this.db.query.user.findFirst({
      where: eq(users.id, id),
    });
    return user;
  }
}
