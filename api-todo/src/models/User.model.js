import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    tasks: {
      type: [{ title: String, description: String, completed: Boolean }],
      required: false,
      default: [
        { title: "not tasks", description: "My first task", completed: false },
      ],
    },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", UserSchema);

export { User };
