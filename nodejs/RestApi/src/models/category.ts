import mongoose, { Schema } from "mongoose";

export interface ICategory {
  findOne(arg0: { name: { $regex: RegExp; }; }): unknown;
  id: number;
  name: string;
  description?: string;
  isactive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    description: { type: String, required: false, trim: true, maxlength: 200 },
    isactive: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
