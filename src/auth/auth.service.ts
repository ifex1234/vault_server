/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-userDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, lastName, firstName } = registerUserDto;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let hashedPin: string | undefined;
    if (registerUserDto.pin) {
      if (registerUserDto.pin.length < 4) {
        // Basic validation
        throw new BadRequestException('PIN must be at least 4 digits');
      }
      hashedPin = await bcrypt.hash(registerUserDto.pin, 10);
    }
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      pin: hashedPin!,
    });

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, pin, ...result } = user;
      return { ...result, hasPin: pin != null };
    }
    return null;
  }

  async verifyPin(userId: number, pin: string): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.pin) {
      return false; // User not found or no PIN set
    }

    const isPinValid = await bcrypt.compare(pin, user.pin);
    return isPinValid;
  }
}
