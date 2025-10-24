import mongoose, { Schema, type Document } from "mongoose";


//User için gerekli bilgiler
export interface IUser extends Document {
    surname: string,
    lastname:string,
    email:string,
    password:string,
    date?: Date
}

export interface IRegister {
    surname:string,
    lastname:string,
    email:string,
    password:string
}

// User şeması kurulur
const userSchema: Schema<IUser> = new Schema ({
    surname: {type: String, required: true,},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {
        type: Date,
        default:() => {
            const now = new Date();
            return now.setHours(now.getHours() + 3)
        }}

})

const UserDB = mongoose.model<IUser>('User', userSchema);

// Dışardan görünme için gerekli
export default UserDB