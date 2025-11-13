import {
  Controller,
  Post,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

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
}
