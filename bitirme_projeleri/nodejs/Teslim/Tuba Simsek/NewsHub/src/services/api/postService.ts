import { IResult, jsonResult } from "../../models/result";
import Post, { IPost } from "../../models/postModel";
import mongoose from "mongoose";
import Category from "../../models/categoryModel";

export const addpost = async (data: IPost, userid: any) => {
  try {
    if (!data.title || !data.content || !data.category) {
      return jsonResult(400, false, "Title, content and category are required", null);
    }
    data.author = userid
    const post = new Post(data);
    await post.save();
    return jsonResult(201, true, "Post added successfully", {
      id: post._id,
      title: post.title
    });
  } catch (error: any) {
    console.error("Add Post Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
}

// Haber düzenleme (Admin)
export const updatepost = async (PostId: string, PostData: any): Promise<IResult> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(PostId)) {
      return jsonResult(400, false, "Invalid id", null);
    }

    const updates: any = {};

    // Title güncellenmek isteniyorsa
    if (PostData?.title !== undefined) updates.title = PostData.title;

    // Content güncellenmek isteniyorsa
    if (PostData?.content !== undefined) updates.content = PostData.content;

    // Kategori güncellenmek isteniyorsa:
    if (PostData?.categoryId !== undefined) {
      const categoryId = PostData.categoryId;
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
    const updatedPost = await Post.findByIdAndUpdate(
      PostId,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("category", "name description isactive");

    if (!updatedPost) {
      return jsonResult(404, false, "Post not found", null);
    }

    return jsonResult(200, true, "Post updated successfully", updatedPost);
  } catch (error: any) {
    console.error("Edit Post Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

// Haber silme (Admin)
export const removepost = async (PostId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(PostId)) {
      return jsonResult(400, false, "Invalid id", null);
    }

    const deleted = await Post.findByIdAndDelete(PostId);
    if (!deleted) {
      return jsonResult(404, false, "Post not found", null);
    }

    return jsonResult(200, true, "Post deleted successfully", {
      id: deleted._id,
      title: deleted.title
    });
  } catch (error: any) {
    console.error("Remove Post Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};

// Haberleri listeleme
export const postListAll = async (page: number = 1, limit: number = 10) => {
  try {
    const skip = (page - 1) * limit;
    const items = await Post.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Post.countDocuments();

    return jsonResult(200, true, "All Post fetched successfully", {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error: any) {
    console.error("List All Post Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
}

// Haber arama (sayfalama) (Admin, User)
export const searchpost = async (q: string, page: number = 1, limit: number = 10) => {
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
      Post.find(filter).skip(skip).limit(safeLimit).sort({ createdAt: -1 }),
      Post.countDocuments(filter)
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
    console.error("Search Post Error:", error);
    return jsonResult(500, false, "Internal server error", error.message);
  }
};



