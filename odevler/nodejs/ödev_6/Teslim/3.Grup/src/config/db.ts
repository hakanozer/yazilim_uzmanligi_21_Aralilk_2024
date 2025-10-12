import mongoose from "mongoose";
import dotenv from "dotenv";

// .env dosyasını yükle
dotenv.config();

const url: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/teamtask';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB Connection Success");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
}

module.exports = { connectDB };