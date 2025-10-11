import { Schema, model, Document, Types } from "mongoose";

export enum TaskStatus {
  TODO = "Todo",
  IN_PROGRESS = "InProgress",
  DONE = "Done",
}

export interface ITask extends Document {
  title: string;
  description?: string;
  status: TaskStatus;
  project: Types.ObjectId;
  assignedTo: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", TaskSchema);