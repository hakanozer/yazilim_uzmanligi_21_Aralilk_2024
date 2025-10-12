import mongoose, { Document, Schema } from "mongoose";
import { eRoles } from "../utils/eRoles";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: eRoles[];
  jwt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    roles: {
      type: [String],
      enum: Object.values(eRoles),
      default: [eRoles.Developer]
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>("User", userSchema);