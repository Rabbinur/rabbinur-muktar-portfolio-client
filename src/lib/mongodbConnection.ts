import mongoose from "mongoose";
// import { seedAdmin } from "./seedAdmin";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function mongodbConnection() {
  if (!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URL!, opts).then(async (mongooseInstance) => {
      console.log("✅ MongoDB Connected Successfully!");
      
      // Admin seeding disabled — credentials already exist in the database
      // try {
      //   await seedAdmin();
      // } catch (seedErr: any) {
      //   console.error("❌ Admin seeding failed:", seedErr.message);
      // }
      
      return mongooseInstance;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default mongodbConnection;
