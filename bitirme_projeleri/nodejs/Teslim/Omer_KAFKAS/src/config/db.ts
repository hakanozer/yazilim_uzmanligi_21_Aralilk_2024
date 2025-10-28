import mongoose from "mongoose";
import dotenv from "dotenv";

// .env dosyasını yükle
dotenv.config();

const url: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/newshub';
const DB_NAME: string = process.env.DB_NAME || 'newshub';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(url, {dbName: DB_NAME});
        console.log("MongoDB Connection Success");
    } catch (error: unknown) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
}

export { connectDB };