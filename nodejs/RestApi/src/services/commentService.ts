import { jsonResult } from "../models/result";
import CommentDB, { IComment } from "../models/commentModel";
import UserDB from "../models/userModel";
import mongoose from "mongoose";

export const createComment = async (commentData: Partial<IComment>, userId: string, userName: string) => {
    try {
        if (!commentData.newsId) {
            return jsonResult(400, false, "newsId gerekli", null);
        }
        if (!mongoose.isValidObjectId(String(commentData.newsId))) {
            return jsonResult(400, false, "newsId geçersiz", null);
        }

        const user = await UserDB.findById(userId);
        if (!user) {
            return jsonResult(404, false, "Kullanıcı bulunamadı", null);
        }

        const comment = new CommentDB({
            content: commentData.content,
            userId: new mongoose.Types.ObjectId(userId),
            newsId: new mongoose.Types.ObjectId(String(commentData.newsId)),
            lastUpdatedById: new mongoose.Types.ObjectId(userId),
            isActive: false,
            like: 0,
            dislike: 0
        });

        await comment.save();
        await comment.populate("userId", "name email");

        return jsonResult(201, true, "Yorum başarıyla oluşturuldu", comment);
    } catch (error) {
        return jsonResult(500, false, "Yorum oluşturulurken hata oluştu", (error as Error).message);
    }
};

export const updateComment = async (commentId: string, updateData: Partial<IComment>, userId: string, userRoles: string[]) => {
    try {
        const comment = await CommentDB.findById(commentId);
        
        if (!comment) {
            return jsonResult(404, false, 'Yorum bulunamadı', null);
        }

        // Yetki kontrolü
        const isOwner = comment.userId.toString() === userId;
        const isCustomer = userRoles.includes('Customer');
        const isUser = userRoles.includes('User');

        if (isCustomer) {
            // Customer tüm yorumları düzenleyebilir
        } else if (isUser && !isOwner) {
            return jsonResult(403, false, 'Sadece kendi yorumlarınızı düzenleyebilirsiniz', null);
        } else if (!isUser && !isCustomer) {
            return jsonResult(403, false, 'Bu işlem için yetkiniz yok', null);
        }

        // Güncelleme
        if (updateData.content !== undefined) comment.content = updateData.content;
        comment.lastUpdatedById = new mongoose.Types.ObjectId(userId);
        comment.updatedAt = new Date();

        await comment.save();
        await comment.populate('userId', 'name email');
        
        return jsonResult(200, true, 'Yorum başarıyla güncellendi', comment);
    } catch (error) {
        return jsonResult(500, false, 'Yorum güncellenirken hata oluştu', error.message);
    }
};

export const approveComment = async (commentId: string, isApproved: boolean) => {
    try {
        const comment = await CommentDB.findById(commentId);
        
        if (!comment) {
            return jsonResult(404, false, 'Yorum bulunamadı', null);
        }

        comment.isActive = isApproved; // Onaylanan yorumlar aktif olur
        comment.updatedAt = new Date();

        await comment.save();
        await comment.populate('userId', 'name email');
        
        const message = isApproved ? 'Yorum onaylandı' : 'Yorum reddedildi';
        return jsonResult(200, true, message, comment);
    } catch (error) {
        return jsonResult(500, false, 'Onay işlemi sırasında hata oluştu', error.message);
    }
};

export const getComments = async (page: number = 1, limit: number = 10, filters: any = {}) => {
    try {
        const skip = (page - 1) * limit;
        
        // Varsayılan filtre: sadece aktif ve onaylanmış yorumlar
        const query = {
            isActive: true,
            ...filters
        };

        const comments = await CommentDB.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await CommentDB.countDocuments(query);
        
        return jsonResult(200, true, 'Yorumlar başarıyla getirildi', {
            comments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalComments: total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            }
        });
    } catch (error) {
        return jsonResult(500, false, 'Yorumlar getirilirken hata oluştu', error.message);
    }
};

export const getUserComments = async (userId: string, page: number = 1, limit: number = 10) => {
    try {
        const skip = (page - 1) * limit;
        
        const comments = await CommentDB.find({ userId: new mongoose.Types.ObjectId(userId) })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await CommentDB.countDocuments({ userId: new mongoose.Types.ObjectId(userId) });
        
        return jsonResult(200, true, 'Kullanıcı yorumları başarıyla getirildi', {
            comments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalComments: total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            }
        });
    } catch (error) {
        return jsonResult(500, false, 'Kullanıcı yorumları getirilirken hata oluştu', error.message);
    }
};

export const getPendingComments = async (page: number = 1, limit: number = 10) => {
    try {
        const skip = (page - 1) * limit;
        
        const comments = await CommentDB.find({ isActive: false })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await CommentDB.countDocuments({ isActive: false });
        
        return jsonResult(200, true, 'Onay bekleyen yorumlar getirildi', {
            comments,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalComments: total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            }
        });
    } catch (error) {
        return jsonResult(500, false, 'Onay bekleyen yorumlar getirilirken hata oluştu', error.message);
    }
};

export const searchComments = async (searchTerm: string, page: number = 1, limit: number = 10) => {
    try {
        const skip = (page - 1) * limit;
        
        const query = {
            isActive: true,
            content: { $regex: searchTerm, $options: 'i' }
        };

        const comments = await CommentDB.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await CommentDB.countDocuments(query);
        
        return jsonResult(200, true, 'Arama sonuçları getirildi', {
            comments,
            searchTerm,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalComments: total,
                hasNext: page < Math.ceil(total / limit),
                hasPrev: page > 1
            }
        });
    } catch (error) {
        return jsonResult(500, false, 'Arama sırasında hata oluştu', error.message);
    }
};