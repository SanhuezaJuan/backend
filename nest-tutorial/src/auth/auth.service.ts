import { Injectable, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from 'src/user/Validations';
import { JwtService } from '@nestjs/jwt';
import { ExceptionBody, verifyPassword } from 'src/user/utils';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  async loginUser(body: { username: string; password: string }) {
    try {
      let UserFound = await this.userService.getUserByUsername(body.username);
      if (!UserFound) throw new Error('User not found');

      let isPasswordMatch = await verifyPassword(
        body.password,
        UserFound.password,
      );

      if (!isPasswordMatch) throw new Error('Password does not match');

      // generate Jwt token
      const payload = {
        sub: UserFound._id,
        username: UserFound.username,
        role: UserFound.role,
      };

      let accesToken = await this.jwtService.signAsync(payload);

      let { password, ...data } = UserFound;
      return {
        Authenticated: true,
        data,
        code: 200,
        accesToken,
      };
    } catch (error) {
      throw new ExceptionBody(
        'Fallo al loggear al usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
