import { hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  try {
    let hashPass = await hash(password, 10);

    return hashPass;
  } catch (err) {
    throw new Error('error');
  }
};
