import { User } from "../schema/model.js";

/**
 *
 * @param {string} id
 * @param {string} property   field to update
 * @param {string} valueProperty
 *
 */
export async function SearchUserByIdAndUpdate(id, property, valueProperty) {
  try {
    console.log(property.toLowerCase() === "email");
    let Propertys = ["email", "username", "password"];

    if (!Propertys.includes(property.toLowerCase())) {
      throw new Error("The field to update is invalid");
    }
    let user = await User.findByIdAndUpdate(id, { [property]: valueProperty });

    if (!user) throw new Error("User not found");

    return {
      updated: true,
      UpdatedField: property,
      newValue: valueProperty,
    };
  } catch (err) {
    throw err;
  }
}
