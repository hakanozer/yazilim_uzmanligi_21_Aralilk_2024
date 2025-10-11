import { IResult, jsonResult } from "../models/result";
import News, { INews } from "../models/newsModel";
import mongoose from "mongoose";
import Category from "../models/category";

export const addNews = async (data: INews, userid: any) => {
  try {
    if (!data.title || !data.content || !data.category) {
      return jsonResult(400, false, "Title, content and category are required", null);
    }
    data.author = userid
    const news = new News(data);
    await news.save();
    return jsonResult(201, true, "News added successfully", {
      id: news._id,
      title: news.title
    });
  } catch (error: any) {
    console.error("Add News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
}

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

// Haberleri listeleme
export const newsListAll = async (page: number = 1, limit: number = 10) => {
  try {
    const skip = (page - 1) * limit;
    const items = await News.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await News.countDocuments();

    return jsonResult(200, true, "All news fetched successfully", {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    console.error("List All News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
}

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

    const filter = { $or: [{ title: regex }, { content: regex }] };

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