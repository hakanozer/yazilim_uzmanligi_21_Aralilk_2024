import mongoose, { Document, Schema } from "mongoose";

export interface IDashboard extends Document {
  userId: string;   // hangi kullanıcı girdiyse onun Id si
  title: string;
  detail: string;
  date?: Date;
  color?: string;

}

const DashboardSchema: Schema<IDashboard> = new Schema({
  userId: { type: String, required: true }, //
  title: { type: String, required: true },
  detail: { type: String, required: true },
  date: {
    type: Date,
    default: () => {
      const now = new Date();
      return now.setHours(now.getHours() + 3)
    }
  },
  color: { type: String }
});

const DashboardDB = mongoose.model<IDashboard>("Dashboard", DashboardSchema)
export default DashboardDB;
