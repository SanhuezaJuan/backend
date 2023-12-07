import { BodyParams } from 'src/interface/Body.interface.Params';
import { CreateUserDTO } from './ValidationBody';

export const TrimBodyFunction = (body: BodyParams): BodyParams => {
  try {
    let { email, password, username } = body;

    if (!email.trim() || !password.trim() || !username.trim()) {
      throw new Error('Faltan campos');
    }

    const ValidatorClass = new CreateUserDTO();
    ValidatorClass.username = username.trim();
    ValidatorClass.email = email.trim();
    ValidatorClass.password = password.trim();
    return ValidatorClass;
  } catch (error) {
    throw error.message;
  }
};
