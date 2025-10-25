import mongoose, { Schema, Document, Model } from 'mongoose';

export type CategoryKind = 'news' | 'blog' | 'both';

export interface ICategory extends Document {
  name: string;
  description?: string;
  kind: CategoryKind;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    kind: { type: String, enum: ['news', 'blog', 'both'], default: 'both', required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);


export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

export default Category;