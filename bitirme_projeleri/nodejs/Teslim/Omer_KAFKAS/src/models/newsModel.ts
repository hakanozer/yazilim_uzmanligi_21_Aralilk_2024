import mongoose, { Schema, Document, Model } from "mongoose";
import { eRoles } from "../utils/eRoles";

export interface INews extends Document {
  title: string;
  content: string;
  category: string;
  image?: string;
  author: mongoose.Types.ObjectId;
  views: number;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema: Schema<INews> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Başlık gerekli"],
      trim: true,
      minlength: [10, "Başlık en az 10 karakter olmalı"],
      maxlength: [200, "Başlık en fazla 200 karakter olmalı"],
    },
    content: {
      type: String,
      required: [true, "İçerik gerekli"],
      minlength: [50, "İçerik en az 50 karakter olmalı"],
    },
    category: {
      type: String,
      required: [true, "Kategori gerekli"],
      enum: [
        "Teknoloji",
        "Spor",
        "Ekonomi",
        "Sağlık",
        "Eğitim",
        "Gündem",
        "Diğer",
      ],
      default: "Gündem",
    },
    image: {
      type: String,
      default: null,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Yazar gerekli"],
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ category: 1 });
newsSchema.index({ author: 1 });
newsSchema.index({ createdAt: -1 });
newsSchema.index({ title: "text", content: "text" });

const News: Model<INews> = mongoose.model<INews>("News", newsSchema);

export default News;
