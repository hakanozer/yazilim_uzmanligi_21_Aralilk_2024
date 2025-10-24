import mongoose from "mongoose";


// DB Kurulumu
const url = 'mongodb://localhost:27017/mvc'
const options = {
    dbName: 'mvc'
}

// DB Dışarda Kullanma
export const connectDB = async () => {
    try {
        await mongoose.connect(url, options);
        console.log('mongodb connected');
    } catch (error) {
        console.error('mongodb connection error:', error);
    }
}