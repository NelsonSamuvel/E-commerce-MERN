import mongoose from "mongoose";

export const connectDb = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
