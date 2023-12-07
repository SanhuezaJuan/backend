import { Request } from 'express';
import { ROLES } from 'src/auth/enums/Role.enum';

export interface RequestUser extends Request {
  user: {
    sub: string;
    username: string;
    role: ROLES;
    iat: number;
    exp: number;
  };
}
