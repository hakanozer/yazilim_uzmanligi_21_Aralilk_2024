import { IResult, jsonResult } from "../models/result";
import News, { INews } from "../models/newsModel";
import mongoose from "mongoose";
import Category from "../models/category";

// Haber ekleme (Admin, Customer)
export const addNews = async (newsData: any, userId: string): Promise<IResult> => {
  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return jsonResult(400, false, "Valid author (user) is required", null);
    }

    if (!newsData?.title || newsData.title.trim().length < 2) {
      return jsonResult(400, false, "Invalid title", null);
    }
    if (!newsData?.content || newsData.content.trim().length < 2) {
      return jsonResult(400, false, "Invalid content", null);
    }

    // categoryId kontrolü
    const categoryId = newsData.categoryId;
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return jsonResult(400, false, "Valid categoryId is required", null);
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return jsonResult(404, false, "Category not found", null);
    }

    const newNews = new News({
      title: newsData.title,
      content: newsData.content,
      category: categoryId,                // <-- Category’ye referans
      author: new mongoose.Types.ObjectId(userId)
    });

    await newNews.save();

    // Geri dönerken populate edebilirsin (detaylı kategori bilgisiyle)
    const populatedNews = await newNews.populate("category");

    return jsonResult(201, true, "News created successfully", populatedNews);
  } catch (error: any) {
    console.error("Add News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

// Haber düzenleme (Admin)
export const editNews = async (newsId: string, newsData: any): Promise<IResult> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return jsonResult(400, false, "Invalid id", null);
    }

    const updates: any = {};

    // Title güncellenmek isteniyorsa
    if (newsData?.title !== undefined) updates.title = newsData.title;

    // Content güncellenmek isteniyorsa
    if (newsData?.content !== undefined) updates.content = newsData.content;

    // Kategori güncellenmek isteniyorsa:
    if (newsData?.categoryId !== undefined) {
      const categoryId = newsData.categoryId;
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return jsonResult(400, false, "Invalid categoryId", null);
      }

      const category = await Category.findById(categoryId);
      if (!category) {
        return jsonResult(404, false, "Category not found", null);
      }

      updates.category = categoryId;
    }

    // Mongoose timestamps sayesinde updatedAt otomatik güncellenir
    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("category", "name description isactive");

    if (!updatedNews) {
      return jsonResult(404, false, "News not found", null);
    }

    return jsonResult(200, true, "News updated successfully", updatedNews);
  } catch (error: any) {
    console.error("Edit News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

// Haber silme (Admin)
export const removeNews = async (newsId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return jsonResult(400, false, "Invalid id", null);
    }

    const deleted = await News.findByIdAndDelete(newsId);
    if (!deleted) {
      return jsonResult(404, false, "News not found", null);
    }

    return jsonResult(200, true, "News deleted successfully", {
      id: deleted._id,
      title: deleted.title
    });
  } catch (error: any) {
    console.error("Remove News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

// Haber listeleme (sayfalama) (Admin, User)
export const listNews = async (page: number = 1, limit: number = 10): Promise<IResult> => {
  try {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;
    const skip = (safePage - 1) * safeLimit;

    const [items, total] = await Promise.all([
      News.find().skip(skip).limit(safeLimit).sort({ createdAt: -1 }),
      News.countDocuments()
    ]);

    return jsonResult(200, true, "News list fetched", {
      items,
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit)
    });
  } catch (error: any) {
    console.error("List News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

// Haber arama (sayfalama) (Admin, User)
export const searchNews = async (q: string, page: number = 1, limit: number = 10) => {
  try {
    if (!q || q.trim().length === 0) {
      return jsonResult(400, false, "Query parameter 'q' is required", null);
    }

    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;
    const skip = (safePage - 1) * safeLimit;
    const regex = new RegExp(q, "i");

    const filter = { $or: [{ title: regex }, { content: regex }, { category: regex }] };

    const [items, total] = await Promise.all([
      News.find(filter).skip(skip).limit(safeLimit).sort({ createdAt: -1 }),
      News.countDocuments(filter)
    ]);

    return jsonResult(200, true, "Search results fetched", {
      items,
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
      query: q
    });
  } catch (error: any) {
    console.error("Search News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};