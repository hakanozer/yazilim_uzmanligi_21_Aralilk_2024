import { Request, Response } from 'express';
import UserDb from '../models/userModel';
import NewsDb from '../models/newsModel';
import CommentDb from '../models/commentModel';
import { successResult, errorResult } from '../models/result';

// Admin Dashboard - Tüm istatistikler
export const getAdminDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalUsers = await UserDb.countDocuments();
        const totalNews = await NewsDb.countDocuments();
        const totalComments = await CommentDb.countDocuments();
        
        const recentUsers = await UserDb.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('-password');
        
        const recentNews = await NewsDb.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('author', 'name email');
        
        res.status(200).json(successResult('Dashboard verileri', {
            stats: {
                totalUsers,
                totalNews,
                totalComments
            },
            recentUsers,
            recentNews
        }));
    } catch (error) {
        console.error('Get Admin Dashboard Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Tüm Kullanıcıları Getir
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search as string;
        const role = req.query.role as string;

        let query: any = {};
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (role && ['User', 'Moderator', 'Admin'].includes(role)) {
            query.role = role;
        }

        const users = await UserDb.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await UserDb.countDocuments(query);

        res.status(200).json(successResult('Kullanıcılar getirildi', {
            users,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        }));
    } catch (error) {
        console.error('Get All Users Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Kullanıcı Sil (Admin)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const currentUserId = req.userId; // authMiddleware'den

        // Kendi hesabını silmeye çalışıyor mu?
        if (id === currentUserId) {
            res.status(400).json(errorResult('Kendi hesabınızı silemezsiniz!'));
            return;
        }

        const user = await UserDb.findById(id);
        
        if (!user) {
            res.status(404).json(errorResult('Kullanıcı bulunamadı!'));
            return;
        }

        // Admin başka bir admini silmeye çalışıyor mu?
        if (user.role === 'Admin') {
            res.status(403).json(errorResult('Başka bir admin kullanıcısını silemezsiniz!'));
            return;
        }

        // Kullanıcının haberlerini de sil
        await NewsDb.deleteMany({ author: id });
        
        // Kullanıcının yorumlarını da sil
        await CommentDb.deleteMany({ author: id });
        
        // Kullanıcıyı sil
        await UserDb.findByIdAndDelete(id);

        res.status(200).json(successResult('Kullanıcı ve tüm içerikleri başarıyla silindi!'));
    } catch (error) {
        console.error('Delete User Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Kullanıcı Rolünü Güncelle (Admin)
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const currentUserId = req.userId;

        if (!['User', 'Moderator', 'Admin'].includes(role)) {
            res.status(400).json(errorResult('Geçersiz rol!'));
            return;
        }

        // Kendi rolünü değiştirmeye çalışıyor mu?
        if (id === currentUserId) {
            res.status(400).json(errorResult('Kendi rolünüzü değiştiremezsiniz!'));
            return;
        }

        const user = await UserDb.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            res.status(404).json(errorResult('Kullanıcı bulunamadı!'));
            return;
        }

        res.status(200).json(successResult('Kullanıcı rolü güncellendi!', { user }));
    } catch (error) {
        console.error('Update User Role Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Tüm Haberleri Getir (Admin)
export const getAllNewsAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;
        const search = req.query.search as string;
        const category = req.query.category as string;
        const author = req.query.author as string;

        let query: any = {};
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (category) {
            query.category = category;
        }
        
        if (author) {
            query.author = author;
        }

        const news = await NewsDb.find(query)
            .populate('author', 'name email role')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await NewsDb.countDocuments(query);

        res.status(200).json(successResult('Haberler getirildi', {
            news,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        }));
    } catch (error) {
        console.error('Get All News Admin Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};

// Haber Sil (Admin - Herhangi bir haberi silebilir)
export const deleteNewsAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const news = await NewsDb.findById(id);
        
        if (!news) {
            res.status(404).json(errorResult('Haber bulunamadı!'));
            return;
        }

        // Haberin yorumlarını da sil
        await CommentDb.deleteMany({ news: id });
        
        // Haberi sil
        await NewsDb.findByIdAndDelete(id);

        res.status(200).json(successResult('Haber ve tüm yorumları silindi!'));
    } catch (error) {
        console.error('Delete News Admin Error:', error);
        res.status(500).json(errorResult(
            'Sunucu hatası',
            error instanceof Error ? error.message : 'Bilinmeyen hata'
        ));
    }
};
