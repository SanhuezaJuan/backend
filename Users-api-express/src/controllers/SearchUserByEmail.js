import { User } from "../schema/model.js";

/**
 * @param {string} email
 * @returns  User in database
 */
export async function SearchUserByEmail(email) {
  try {
    let user = await User.findOne({ email });

    if (!user) return false;

    return user;
  } catch (err) {
    throw err;
  }
}
