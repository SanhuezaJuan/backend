import mongoose from "mongoose";

const connect = async () => {
  const url = process.env.MONGO_DB;
  return await mongoose.connect(url);
};

export { connect };
