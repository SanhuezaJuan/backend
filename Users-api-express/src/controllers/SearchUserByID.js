import { User } from "../schema/model.js";

export async function SearchUserByID(id, returnUser) {
  try {
    let user = await User.findById(id);
    if (!user) throw new Error("User not found");

    if (!returnUser) return true;
    return user;
  } catch (err) {
    throw err;
  }
}
