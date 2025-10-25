import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/newsHub';
const options = {
    dbName: 'newsHub',
}

export const connectDB = async () => {
    try {
        await mongoose.connect(url, options);
        console.log('mongodb connected');
    } catch (error) {
        console.error('mongodb connection error:', error);
    }
}