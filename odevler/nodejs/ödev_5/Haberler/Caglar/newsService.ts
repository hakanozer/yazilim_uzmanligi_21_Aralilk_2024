import { jsonResult } from "../models/result";
import News from "../models/newsModel";
import mongoose from "mongoose";

// Haber Ekleme
export const addNews = async (data: {title: string, content: string, category: string}) => {
  try {
    if (!data.title || !data.content || !data.category) {
      return jsonResult(400, false, "Title, content and category are required", null);
    }

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
// Haber Silme
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
}
// Haber Arama
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

    const items = await News.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

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
}
// Haber Güncelleme
export const uptadeNews = async (newsId: string, data: Partial<{title: string, content: string, category: string}>) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return jsonResult(400, false, "Invalid id", null);
    }

    const updated = await News.findByIdAndUpdate(newsId,
      {...data},
      {new: true, runValidators: true}
    );
    
    if (!updated) {
      return jsonResult(404, false, "News not found", null);
    }

    return jsonResult(200, true, "News updated successfully", {
      id: updated._id,
      title: updated.title
    });
  } catch (error: any) {
    console.error("Update News Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
}


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
