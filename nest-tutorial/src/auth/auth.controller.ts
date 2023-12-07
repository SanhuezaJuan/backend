import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDTO, LoginDto } from 'src/user/Validations';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RequestUser } from '../interface';
import { Roles } from 'src/auth/decorators/Role.decorators';
import { ROLES } from 'src/auth/enums/Role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() body: CreateUserDTO) {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Body() body: { username: string; password: string }) {
    console.log(body);
    return this.authService.loginUser(body);
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req: RequestUser) {
    return req.user;
  }
}
