import mongoose from 'mongoose';

export async function connectDB(uri?: string) {
  const mongoUri = uri || process.env.MONGO_URI || '';
  if (!mongoUri) {
    throw new Error('MONGO_URI .env içinde tanımlı olmalı');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
  console.log('MongoDB bağlantısı kuruldu');
}