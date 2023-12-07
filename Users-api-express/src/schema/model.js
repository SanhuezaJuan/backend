import mongoose from "mongoose";

//schema of database
const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  premiun: { type: String, required: true },
  refreshtoken: { type: String, required: false },
  userCreatedIn: { type: Number, required: true },
});

// model of database

const User = mongoose.model("User", UserSchema);

export { User };
