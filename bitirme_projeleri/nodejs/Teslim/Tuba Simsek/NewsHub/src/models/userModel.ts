import mongoose, { Document, Schema } from "mongoose";
import { eRoles } from "../utils/eRoles"; 

export interface IUser extends Document {
    name: string;
    email: string;
    password: string; 
    roles: eRoles[]; 
    jwt?: string;     
    createdAt?: Date; 
    updatedAt?: Date; 
}

const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
       
    },
    password: {
        type: String,
        required: true
    },
    roles: { 
        type: [String], 
        enum: [eRoles.Admin, eRoles.User], 
        default: [eRoles.User] 
    },
    jwt: { 
        type: String,
        required: false 
    }
},
{
    timestamps: true 
});

const UserDB = mongoose.model<IUser>('User', UserSchema);
export default UserDB;