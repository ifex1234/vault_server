import { CreateCustomerDto } from './dto/create-customer.dto';
import { customer } from '../../drizzle/schema';
import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
@Injectable()
export class CustomersService {
  constructor(
    @Inject('DRIZZLE_ORM') private db: NodePgDatabase<typeof schema>,
  ) {}
  async create(creatorId: number, createCustomerDto: CreateCustomerDto) {
    const { BVN, NIN, email, phoneNumber } = createCustomerDto;
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
    const emailCheck = await this.db.query.customer.findFirst({
      where: eq(customer.email, email),
    });
    if (emailCheck) {
      throw new ConflictException(
        'customer with this email already registered',
      );
    }
    const phoneNumberCheck = await this.db.query.customer.findFirst({
      where: eq(customer.phoneNumber, phoneNumber),
    });
    if (phoneNumberCheck) {
      throw new ConflictException(
        'customer with this phone number already registered',
      );
    }
    const [newUCustomer] = await this.db
      .insert(customer)
      .values({ ...createCustomerDto, creatorId: creatorId })
      .returning();
    return newUCustomer;
  }

  // async findAll(creatorId: number) {
  //   const data = await this.db.query.customer.findMany({
  //     where: eq(customer.creatorId, creatorId),
  //   });
  //   if (!data || data.length === 0) {
  //     throw new NotFoundException(
  //       `No customers found for user with ID ${creatorId}`,
  //     );
  //   }
  //   return data;
  // }

  async findAll() {
    return this.db.query.customer.findMany({
      with: {
        creator: {
          columns: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  // async findOne(id: number) {
  //   return this.db.query.customer.findFirst({
  //     where: (customer, { eq }) => eq(customer.creatorId, id),
  //     with: {
  //       creator: {
  //         columns: {
  //           id: true,
  //           email: true,
  //         },
  //       },
  //     },
  //   });
  // }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
