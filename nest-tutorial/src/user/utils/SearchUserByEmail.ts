import { Model } from 'mongoose';

export const SearchUserByEmail = async (Model: Model<any>, email: string) => {
  try {
    const User = await Model.findOne({ email });

    if (!User) throw new Error('User not found in database');
    return User;
  } catch (err) {
    return false;
  }
};
