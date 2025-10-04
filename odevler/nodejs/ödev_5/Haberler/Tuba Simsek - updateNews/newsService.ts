import { jsonResult } from "../models/result";
import News from "../models/newsModel";
import mongoose from "mongoose";

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
// Haber arama (sayfalama) (Admin, User)
export const searchNews = async (q: string, page: number = 1, limit: number = 10) => {
  try {
    if (!q || q.trim() === "") {
      return jsonResult(400, false, "Query parameter 'q' is required", null);
    }

    const regex = new RegExp(q, "i"); // büyük/küçük harf duyarsız regexe çevirme
    const filter = { // title, content ve category içinde aranan kelime geçerse filtresi
      $or: [
        { title: regex },
        { content: regex },
        { category: regex }
      ]
    };

    const skip = (page - 1) * limit;

    // Önce kayıtları al
    const items = await News.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Sonra toplam sayıyı al
    const total = await News.countDocuments(filter);

    return jsonResult(200, true, "Search results fetched", {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      query: q
    });

  } catch (error: any) {
    console.error("Search News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

// Haber ekleme (Admin)
/*
export const addNews = async (newsData: any) => {
  try {
    if (!newsData.title || !newsData.content) {
      return jsonResult(400, false, "Title and content are required", null);
    }

    const newNews = new News({
      title: newsData.title,
      content: newsData.content,
      category: newsData.category,
      author: newsData.author // login olan admin’in userId’si
    });

    await newNews.save();

    return jsonResult(201, true, "News created successfully", newNews);
  } catch (error: any) {
    console.error("Add News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};
*/

// Haber güncelleme (Admin)
export const updateNews = async (newsId: string, data: Partial<{ title: string, content: string, category: string}>) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return jsonResult(400, false, "Invalid id", null);
    }

    const updated = await News.findByIdAndUpdate(
      newsId,
      { ...data },
      { new: true, runValidators: true } // runValidators: şema kurallarını kontrol etsin
    );

    if (!updated) {
      return jsonResult(404, false, "News not found", null);
    }

    return jsonResult(200, true, "News updated successfully", updated);
  } catch (error: any) {
    console.error("Update News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};
