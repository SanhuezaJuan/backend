import { User } from "../schema/model.js";

export async function SearchUserByUsername(username) {
  try {
    let user = await User.findOne({ username });

    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    return false;
  }
}
