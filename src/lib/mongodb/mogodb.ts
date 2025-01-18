import mongoose from "mongoose";

export default async function connectMongoDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
