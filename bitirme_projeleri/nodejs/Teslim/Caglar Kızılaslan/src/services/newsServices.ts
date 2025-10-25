import NewsDB, { INewsModel } from "../models/newsModel";
import { Request } from "express";
import CommentDB from "../models/commentModel";


// News Add
export const newsAdd = async (news:INewsModel, req:Request) => {
    try {
        const user = req.session.item;
        if (!user) {
            return "Unauthorized";
        }
        const payload: any = {
            title: news.title,
            detail: news.detail,
            color: news.color,
            userID: user._id
        };
        if ((news as any).date) payload.date = new Date((news as any).date);
        const created = new NewsDB(payload);
        await created.save();
        return true;
    } catch (error: any) {
        return error?.message || "Note adding failed";
        
    }
}

export const listNews = async (req: Request) => {
    const user = req.session.item;
    if (user?.role === 'admin') {
        return await NewsDB.find({}).populate('userID', 'surname lastname email').sort({ date: -1 });
    }
    return await NewsDB.find({ userID: user?._id }).populate('userID', 'surname lastname email').sort({ date: -1 });
}

export const getNewsById = async (id: string) => {
    return await NewsDB.findById(id);
}

export const updateNews = async (id: string, payload: Partial<INewsModel>, req: Request) => {
    const post = await NewsDB.findById(id);
    const user = req.session.item;
    if (!post) return "Post not found";
    const isOwner = post.userID?.toString() === user?._id?.toString();
    const isAdmin = user?.role === 'admin';
    if (!isOwner && !isAdmin) return "Unauthorized";
    await NewsDB.findByIdAndUpdate(id, payload);
    return true;
}

export const deleteNews = async (id: string, req: Request) => {
    const post = await NewsDB.findById(id);
    const user = req.session.item;
    if (!post) return "Post not found";
    const isOwner = post.userID?.toString() === user?._id?.toString();
    const isAdmin = user?.role === 'admin';
    if (!isOwner && !isAdmin) return "Unauthorized";
    await NewsDB.findByIdAndDelete(id);
    await CommentDB.deleteMany({ postID: id });
    return true;
}

export const addComment = async (postId: string, text: string, req: Request) => {
    const user = req.session.item;
    if (!user) return "Unauthorized";
    const comment = new CommentDB({ postID: postId, userID: user._id, text });
    await comment.save();
    return true;
}

export const listComments = async (postId: string) => {
    return await CommentDB.find({ postID: postId }).populate('userID', 'surname lastname email').sort({ date: -1 });
}

export const deleteComment = async (postId: string, commentId: string, req: Request) => {
    const post = await NewsDB.findById(postId);
    const user = req.session.item;
    if (!post) return "Post not found";
    const isOwner = post.userID?.toString() === user?._id?.toString();
    const isAdmin = user?.role === 'admin';
    if (!isOwner && !isAdmin) return "Unauthorized";
    await CommentDB.findByIdAndDelete(commentId);
    return true;
}