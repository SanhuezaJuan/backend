import { ROLES } from 'src/auth/enums/Role.enum';

export interface BodyParams {
  username: string;
  email: string;
  password: string;
  role: ROLES;
}

export interface UserInterface extends BodyParams {
  _id: string;
}
