import mongoose, { Schema } from "mongoose";

export interface INews {
  title: string;
  content: string;
  category?: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  likesID?: mongoose.Types.ObjectId[]; // beğenen kullanıcı id'leri
  dislikesID?: mongoose.Types.ObjectId[]; // beğenmeyen kullanıcı id'leri
  comments?: mongoose.Types.ObjectId[]; // yorum id'leri
}

const NewsSchema: Schema<INews> = new Schema(
  {
    title: { type: String, required: true, minlength: 2, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    content: { type: String, required: true, minlength: 150, maxlength: 4000, trim: true },
    imageUrl: { type: String, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: false },
    likesID: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    dislikesID: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }]
  },
  {
    timestamps: true
  }
);

//otomatik tarih alımı ara katman kancası
NewsSchema.pre("save", function (next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

const News = mongoose.model<INews>("News", NewsSchema);
export default News;