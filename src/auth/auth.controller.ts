/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-userDTO';
import { VerifyPinDto } from './dto/verify-pinDTO';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @HttpCode(200)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('verify-pin')
  async verifyPin(@Request() req, @Body() verifyPinDto: VerifyPinDto) {
    const userId = req.user.id; // Assuming `id` is in the JWT payload
    const isPinValid = await this.authService.verifyPin(
      userId,
      verifyPinDto.pin,
    );
    if (!isPinValid) {
      throw new UnauthorizedException('Invalid PIN');
    }
    return { success: true };
  }
  @HttpCode(200)
  @HttpCode(HttpStatus.OK)
  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: UpdateUserDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
