import { Request, Response } from 'express';
import CommentDb from '../models/commentModel';
import NewsDb from '../models/newsModel';
import { successResult, errorResult } from '../models/result';

// Yorum Oluştur
export const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { content } = req.body;
        const { newsId } = req.params;
        const userId = req.userId; // authMiddleware'den geliyor

        // Haber var mı kontrol et
        const news = await NewsDb.findById(newsId);
        if (!news) {
            res.status(404).json(errorResult('Haber bulunamadı!'));
            return;
        }

        // Yorum oluştur
        const comment = new CommentDb({
            content,
            author: userId,
            news: newsId
        });

        await comment.save();

        // Populate ile yazar bilgilerini getir
        await comment.populate('author', 'name email');

        res.status(201).json(successResult('Yorum başarıyla eklendi!', { comment }));
    } catch (error) {
        console.error('Create Comment Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Habere Ait Yorumları Getir
export const getCommentsByNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { newsId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        // Haber var mı kontrol et
        const news = await NewsDb.findById(newsId);
        if (!news) {
            res.status(404).json(errorResult('Haber bulunamadı!'));
            return;
        }

        // Yorumları getir
        const comments = await CommentDb.find({ news: newsId })
            .populate('author', 'name email role')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await CommentDb.countDocuments({ news: newsId });

        res.status(200).json(successResult('Yorumlar getirildi', {
            comments,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        }));
    } catch (error) {
        console.error('Get Comments Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Kullanıcının Tüm Yorumlarını Getir
export const getMyComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const comments = await CommentDb.find({ author: userId })
            .populate('news', 'title slug')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await CommentDb.countDocuments({ author: userId });

        res.status(200).json(successResult('Yorumlarınız getirildi', {
            comments,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        }));
    } catch (error) {
        console.error('Get My Comments Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Yorum Sil (Sadece admin veya yorum sahibi)
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const userRole = req.userRole; // authMiddleware'den geliyor

        // Yorum var mı kontrol et
        const comment = await CommentDb.findById(id);
        if (!comment) {
            res.status(404).json(errorResult('Yorum bulunamadı!'));
            return;
        }

        // Yetki kontrolü: Admin veya yorum sahibi silebilir
        if (userRole !== 'Admin' && comment.author.toString() !== userId) {
            res.status(403).json(errorResult('Bu yorumu silme yetkiniz yok!'));
            return;
        }

        await CommentDb.findByIdAndDelete(id);

        res.status(200).json(successResult('Yorum başarıyla silindi!'));
    } catch (error) {
        console.error('Delete Comment Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Yorum Güncelle (Sadece yorum sahibi)
export const updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.userId;

        // Yorum var mı kontrol et
        const comment = await CommentDb.findById(id);
        if (!comment) {
            res.status(404).json(errorResult('Yorum bulunamadı!'));
            return;
        }

        // Yetki kontrolü: Sadece yorum sahibi güncelleyebilir
        if (comment.author.toString() !== userId) {
            res.status(403).json(errorResult('Bu yorumu güncelleme yetkiniz yok!'));
            return;
        }

        comment.content = content;
        await comment.save();

        await comment.populate('author', 'name email');

        res.status(200).json(successResult('Yorum başarıyla güncellendi!', { comment }));
    } catch (error) {
        console.error('Update Comment Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};
