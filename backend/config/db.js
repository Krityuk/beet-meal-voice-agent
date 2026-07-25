import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected Successfully");

    } catch (err) {
        console.error("❌ Connection Failed");
        console.error(err.message);

        process.exit(1); // unsuccessful termination of this script, 1 is status code which means unsuccesful
    }
}