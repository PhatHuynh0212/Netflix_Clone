import mongoose from "mongoose";
import { ENV_VAR } from "./envVar.js";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(ENV_VAR.MONGO_URI);
    console.log("MongoDB connected: ", connect.connection.host);
  } catch (error) {
    console.error("Error connecting MongoDB: ", error.message);
    process.exit(1); // 1means error, 0 means success
  }
};
