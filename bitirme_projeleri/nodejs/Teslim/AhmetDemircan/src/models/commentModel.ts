import mongoose, { Schema, Document, Model } from 'mongoose';

export type CommentSubjectModel = 'Blog' | 'News';

export interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  subjectModel: CommentSubjectModel; // 'Blog' veya 'News'
  subject: mongoose.Types.ObjectId;  // ilgili Blog/News id'si
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true, trim: true, minlength: 1, maxlength: 2000 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subjectModel: { type: String, enum: ['Blog', 'News'], required: true },
    subject: { type: Schema.Types.ObjectId, refPath: 'subjectModel', required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

commentSchema.index({ subjectModel: 1, subject: 1, createdAt: -1 });

export const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);

export default Comment;