import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyPinDto {
  @IsNotEmpty({ message: 'PIN is required' })
  @IsString({ message: 'PIN must be a string' })
  @Length(4, 4, { message: 'PIN must be exactly 4 digits' })
  pin: string;
}
