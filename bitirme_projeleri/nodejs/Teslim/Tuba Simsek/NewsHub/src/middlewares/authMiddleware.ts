import { Request, Response, NextFunction } from 'express';
import PostDB from '../models/postModel'; 
import { eRoles } from '../utils/eRoles'; 
import mongoose from 'mongoose'; 

 //1. isAuthenticated: Kullanıcı Giriş Yapmış mı?  Bir rotaya erişim için temel giriş kontrolü.
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userId) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
}

 //2. isAdmin: Kullanıcı Admin mi?
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    
    // === HATA AYIKLAMA: Session'daki rolü ve beklenen rolü yazdır ===
    console.log("isAdmin Middleware Çalıştı.");
    console.log("Session Rolü (req.session.eRoles):", req.session.userRoles); 
    console.log("Beklenen Rol (eRoles.Admin):", eRoles.Admin);
    console.log("Admin Rolü Var Mı?:", req.session.userRoles?.includes(eRoles.Admin)); // ?.includes güvenli erişim sağlar

    if (req.session.userRoles && req.session.userRoles.includes(eRoles.Admin)) {
        console.log("Yetki verildi (Admin).");
        next(); 
    } else {
        console.log("Yetki REDDEDİLDİ.");
        res.status(403).render('error', {
            statusCode: 403,
            message: "Bu sayfaya erişim yetkiniz bulunmamaktadır.",
            layout: false
        });
    }
}

export const isAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id;
        const userId = req.session.userId;

        if (!postId || !userId || !mongoose.Types.ObjectId.isValid(postId)) {
             // Geçersiz ID veya session yoksa hata ver
            return res.status(400).render('error', { statusCode: 400, message: "Geçersiz istek.", layout: false });
        }
        const post = await PostDB.findById(postId);
        if (!post) {
            return res.status(404).render('error', { statusCode: 404, message: "Yazı bulunamadı.", layout: false });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).render('error', { statusCode: 403, message: "Bu işlem için yetkiniz bulunmamaktadır.", layout: false });
        }
        next(); 

    } catch (error) {
        next(error); // Veritabanı vb. hatası olursa genel yöneticiye gönder
    }
}

 // 4. yorumu silme yetkisini kontrol eder (Admin VEYA Post Sahibi).
export const canDeleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;
        const { userId, userRoles } = req.session;
        if (!userId || !userRoles || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).render('error', { statusCode: 400, message: "Geçersiz istek veya kimlik doğrulama hatası.", layout: false });
        }
        // Kural 1: Admin ise direkt devam et
        if (userRoles.includes(eRoles.Admin)) {
            return next();
        }

        // Kural 2: Post sahibi mi diye kontrol et
        const post = await PostDB.findById(postId);
        if (post && post.author.toString() === userId) {
            return next();
        }
        // Yetkisi yoksa 403 hatası
        res.status(403).render('error', { statusCode: 403, message: "Bu yorumu silme yetkiniz bulunmamaktadır.", layout: false });

    } catch (error) {
        next(error); // Veritabanı vb. hatası olursa genel yöneticiye gönder --> 500
    }
};