import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { required: true, type: String },
    password: { required: true, type: String },
    city: { required: true, type: String },
    key: { required: true, type: String },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", UserSchema);

export { User };
