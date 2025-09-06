import { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    date?: Date
}

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User