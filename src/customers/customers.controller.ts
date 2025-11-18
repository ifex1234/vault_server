import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post(':create-customer')
  create(@Request() req, @Body() createCustomerDto: CreateCustomerDto) {
    const userId = req.user.id;
    return this.customersService.create(userId, createCustomerDto);
  }

  // @Get('user/:userId')
  // async findAll(@Param('userId', ParseIntPipe) creatorId: number) {
  //   try {
  //     return await this.customersService.findAll(creatorId);
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     throw error;
  //   }
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.customersService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
