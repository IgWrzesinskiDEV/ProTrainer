import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import connectMongoDb from "./mogodb";
await connectMongoDb();
export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);
