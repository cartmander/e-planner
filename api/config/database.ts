import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined in the .env file");
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            dbName: process.env.DB_NAME
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;