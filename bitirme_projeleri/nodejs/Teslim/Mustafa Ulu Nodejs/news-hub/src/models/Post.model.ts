import { Schema, model, Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
    content: { type: String, required: true, trim: true, minlength: 10 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", PostSchema);
export default Post;
