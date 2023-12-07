import { Model } from 'mongoose';

export const SearchUserByUsername = async (
  Model: Model<any>,
  username: string,
) => {
  try {
    const User = await Model.findOne({ username });
    if (!User) throw new Error('User not found in database');
    return User;
  } catch (error) {
    return null;
  }
};
