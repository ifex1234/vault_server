import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  customerAddress: string;
  @IsString()
  customerBusinessAddress: string;
  @IsString()
  phoneNumber: number;
  @IsString()
  phoneNumber2: number;
  @IsString()
  BVN: number;
  @IsString()
  NIN: number;
  @IsString()
  customerDOB: Date;
  @IsString()
  utilityBillUrl: string;
  @IsString()
  identificationUrl: string;
  @IsUUID()
  creatorId: number;
}
