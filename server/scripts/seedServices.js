import "dotenv/config";
import mongoose from "mongoose";
import { seedServices } from "../src/seed/services.js";

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing.");
await mongoose.connect(process.env.MONGODB_URI);
await seedServices();
await mongoose.disconnect();
console.log("Done.");
