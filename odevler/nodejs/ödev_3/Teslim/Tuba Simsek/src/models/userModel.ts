import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name?: string,
    email: string,
    password: string,
    date?: Date
}

const UserSchema: Schema<IUser> = new Schema({
    name: {type: String, required: true}, // required: true kullanıcı tarafından doldurulması zorunlu alan anlamında
    email: {type: String, required: true, unique: true}, // unique: true email alanının benzersiz olmasını sağlar
    password: {type: String, required: true},
    date: {
        type: Date,
         default: () => {
          const now = new Date();
          return now.setHours(now.getHours() + 3); // Türkiye saat dilimine göre ayarlama
        }
    }
})


const UserDB = mongoose.model<IUser>('User', UserSchema) // bu kod  satırı ile User adında bir model oluşturduk ve bu model IUser arayüzünü kullanıyor

export default UserDB // UserDB modelini dışa aktardık ki diğer dosyalarda kullanabilelim