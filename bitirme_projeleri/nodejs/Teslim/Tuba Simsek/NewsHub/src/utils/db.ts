import mongoose from "mongoose";

// dotenv.config() ile yüklendiğini varsayıyoruz.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/MongoConnect';
const DB_NAME = process.env.DB_NAME || 'NewsHub'; 

const options = {
    dbName: DB_NAME
};

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, options);
        console.log("MongoDB Bağlantısı Başarılı!");
    } catch (error) {
        console.error("MongoDB Bağlantı Hatası:", error);
        // Uygulamanın veritabanı olmadan çalışması anlamsız olacağından,
        // hata durumunda uygulamayı durduruyoruz.
        process.exit(1); 
    }
};