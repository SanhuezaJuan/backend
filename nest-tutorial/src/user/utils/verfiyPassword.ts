import { compare } from 'bcrypt';
export const verifyPassword = async (
  password: string,
  passwordEncrypted: string,
): Promise<boolean> => {
  try {
    let isMatch = await compare(password, passwordEncrypted);

    if (!isMatch) throw new Error('Password does not match');
    return isMatch;
  } catch (error) {
    return false;
  }
};
