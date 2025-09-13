import mongoose, { Schema } from "mongoose";

export interface INote extends Document {
  title: string;
  detail: string;
  date: Date;
  color: EXT_sRGB;
}
export const noteShema: Schema<INote> = new Schema({
  title: { type: String },
  detail: { type: String },
  date: {
    type: Date,
    default: () => {
      const now = new Date();
      return now.setHours(now.getHours() + 3);
    },
  },
  color:{type:String},
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});
