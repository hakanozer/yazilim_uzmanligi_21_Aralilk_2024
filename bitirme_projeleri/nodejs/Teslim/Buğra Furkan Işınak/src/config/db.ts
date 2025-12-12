import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/bfitalks';
    
    logger.info(`Connecting to MongoDB: ${mongoURI}`);
    
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    logger.database('connect', 'mongodb', { host: conn.connection.host, name: conn.connection.name });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error('Database connection error:', error);
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
