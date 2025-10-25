import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  postID: any;
  userID: any;
  text: string;
  date: Date;
}

const commentSchema = new Schema<IComment>({
  postID: { type: Schema.Types.ObjectId, ref: 'news', required: true },
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, minlength: 1, maxLength: 1000 },
  date: { type: Date, default: () => new Date() }
});

const CommentDB = mongoose.model<IComment>('Comment', commentSchema);
export default CommentDB;