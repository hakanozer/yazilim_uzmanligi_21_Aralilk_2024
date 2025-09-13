import mongoose, { Schema, Document, Types } from "mongoose";

export interface INote extends Document {
  title: string;
  detail: string;
  date: Date;
  color: string;
  userId: Types.ObjectId;
}

export const noteSchema: Schema<INote> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    detail: { type: String, required: true },
    date: {
      type: Date,
      default: () => new Date(Date.now() + 3 * 60 * 60 * 1000) // UTC +3
    },
    color: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { versionKey: false }
);

export const Note = mongoose.model<INote>("Note", noteSchema);
