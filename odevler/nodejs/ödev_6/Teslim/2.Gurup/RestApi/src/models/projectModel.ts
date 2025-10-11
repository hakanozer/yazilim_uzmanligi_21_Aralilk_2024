import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: "Planned" | "In Progress" | "Completed";
  createdBy: mongoose.Schema.Types.ObjectId; // Project Manager
  teamMembers: mongoose.Schema.Types.ObjectId[];
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Completed"],
      default: "Planned",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
