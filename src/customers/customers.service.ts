import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { customer } from '../../drizzle/schema';
import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
@Injectable()
export class CustomersService {
  constructor(
    @Inject('DRIZZLE_ORM') private db: NodePgDatabase<typeof schema>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const { BVN, NIN } = createCustomerDto;
    const bvnCheck = await this.db.query.customer.findFirst({
      where: eq(customer.bvn, Number(BVN)),
    });
    if (bvnCheck) {
      throw new ConflictException('BVN already registered');
    }
    const ninCheck = await this.db.query.customer.findFirst({
      where: eq(customer.nin, Number(NIN)),
    });
    if (ninCheck) {
      throw new ConflictException('NIN already registered');
    }
    const [newUCustomer] = await this.db
      .insert(customer)
      .values(createCustomerDto)
      .returning();
    return newUCustomer;
  }

  async findAll(creatorId: number) {
    const data = await this.db.query.customer.findMany({
      where: eq(customer.creatorId, creatorId),
    });
    if (!data || data.length === 0) {
      throw new NotFoundException(
        `No customers found for user with ID ${creatorId}`,
      );
    }
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
