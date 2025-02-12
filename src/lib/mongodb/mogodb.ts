import mongoose from "mongoose";

export default async function connectMongoDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.log(error);
  }
}
