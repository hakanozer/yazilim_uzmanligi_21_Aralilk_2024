import mongoose, { Document, Schema } from "mongoose";
import { eRoles } from "../utils/eRoles";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: eRoles
}

const UserSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: [eRoles.Admin, eRoles.Moderator, eRoles.User], default: eRoles.User }
}, {
    timestamps: true
});

const UserDb = mongoose.model<IUser>('User', UserSchema);

export default UserDb;
