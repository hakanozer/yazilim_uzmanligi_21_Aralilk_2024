import {Request, Response } from 'express';
import News from '../models/newsModel';
import { successResult, errorResult } from '../models/result';

// ============================================
// PUBLIC ROUTES
// ============================================

// Tüm haberleri getir
export const getAllNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;

        // Filtreleme
        const filter: any = { status: 'published' };
        
        if (category && category !== 'Tümü') {
            filter.category = category;
        }

        if (search) {
            filter.$text = { $search: search as string };
        }

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);

        const [news, total] = await Promise.all([
            News.find(filter)
                .populate('author', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            News.countDocuments(filter)
        ]);

        res.status(200).json(successResult('Haberler listelendi', {
            news,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / Number(limit))
            }
        }));
    } catch (error) {
        console.error('Get All News Error:', error);
        res.status(500).json(errorResult('Sunucu hatası'));
    }
};

// Tek haber detayı
export const getNewsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const news = await News.findById(id).populate('author', 'name email role');

        if (!news) {
            res.status(404).json(errorResult('Haber bulunamadı!'));
            return;
        }

        // Görüntülenme sayısını artır
        news.views += 1;
        await news.save();

        res.status(200).json(successResult('Haber detayı', { news }));
    } catch (error) {
        console.error('Get News By ID Error:', error);
        res.status(500).json(errorResult('Sunucu hatası'));
    }
};

// Kategoriye göre haberler
export const getNewsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.params;

        const news = await News.find({ category, status: 'published' })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(successResult(`${category} haberleri`, { news }));
    } catch (error) {
        res.status(500).json(errorResult('Sunucu hatası'));
    }
};

// ============================================
// PROTECTED ROUTES (JWT Required)
// ============================================

// Haber oluştur (Admin/Moderator)
export const createNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, content, category } = req.body;

        // Dosya yüklendiyse /uploads/filename.jpg, yoksa body'den gelen URL
        const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

        const news = new News({
            title,
            content,
            category,
            image,
            author: req.userId, // authMiddleware'den gelir
            status: 'published'
        });

        await news.save();

        res.status(201).json(successResult('Haber oluşturuldu!', { news }));
    } catch (error) {
        console.error('Create News Error:', error);
        res.status(500).json(errorResult('Sunucu hatası'));
    }
};

// Kendi haberlerini getir
export const getMyNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const news = await News.find({ author: req.userId })
            .sort({ createdAt: -1 });

        res.status(200).json(successResult('Haberleriniz', { news }));
    } catch (error) {
        res.status(500).json(errorResult('Sunucu hatası'));
    }
};

// Haber güncelle (Sadece kendi haberi)
export const updateNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;

        const news = await News.findById(id);

        if (!news) {
            res.status(404).json(errorResult('Haber bulunamadı!'));
            return;
        }

        // Sadece kendi haberini güncelleyebilir
        if (news.author.toString() !== req.userId) {
            res.status(403).json(errorResult('Bu işlem için yetkiniz yok!'));
            return;
        }

        news.title = title || news.title;
        news.content = content || news.content;
        news.category = category || news.category;
        
        // Yeni dosya yüklendiyse onu kullan, yoksa body'den gelen image varsa onu kullan
        if (req.file) {
            news.image = `/uploads/${req.file.filename}`;
        } else if (req.body.image) {
            news.image = req.body.image;
        }

        await news.save();

        res.status(200).json(successResult('Haber güncellendi!', { news }));
    } catch (error) {
        console.error('Update News Error:', error);
        res.status(500).json(errorResult('Sunucu hatası'));
    }
};

// Haber durumunu değiştir (draft/published) - Admin/Moderator
export const changeNewsStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['draft', 'published'].includes(status)) {
            res.status(400).json(errorResult('Geçersiz durum!'));
            return;
        }

        const news = await News.findById(id);

        if (!news) {
            res.status(404).json(errorResult('Haber bulunamadı!'));
            return;
        }

        news.status = status;
        await news.save();

        res.status(200).json(successResult('Haber durumu değiştirildi!', { news }));
    } catch (error) {
        res.status(500).json(errorResult('Sunucu hatası'));
    }
};

// Haber sil (Sadece Admin veya kendi haberi)
export const deleteNews = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const news = await News.findById(id);

        if (!news) {
            res.status(404).json(errorResult('Haber bulunamadı!'));
            return;
        }

        // Admin her haberi silebilir, diğerleri sadece kendi haberini
        if (req.userRole !== 'Admin' && news.author.toString() !== req.userId) {
            res.status(403).json(errorResult('Bu işlem için yetkiniz yok!'));
            return;
        }

        await news.deleteOne();

        res.status(200).json(successResult('Haber silindi!'));
    } catch (error) {
        console.error('Delete News Error:', error);
        res.status(500).json(errorResult('Sunucu hatası'));
    }
};


