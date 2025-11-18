import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

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
  @IsNumber()
  phoneNumber: number;
  @IsNumber()
  phoneNumber2: number;
  @IsNumber()
  BVN: number;
  @IsNumber()
  NIN: number;
  @IsEnum(Gender)
  gender: Gender;
  @IsString()
  customerDOB: Date;
  @IsString()
  utilityBillUrl: string;
  @IsString()
  identificationUrl: string;
  @IsNumber()
  creatorId: number;
}
