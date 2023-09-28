import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI env variable");
  }
  if (isConnected) {
    console.log("MongoDB connection already open");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connection opened");
  } catch (error) {
    console.log(error);
  }
};
