import mongoose from "mongoose";

export interface IProject {
  name: string;
  description: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model<IProject>("Project", projectSchema);
