import { Request, Response, NextFunction } from 'express';
import * as authService from '../../services/web/authService'; 
import * as postService from '../../services/web/postService'; 

export const showAdminDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Tüm kullanıcıları ve postları servislerden çek (Promise.all ile paralel)
        const [users, posts] = await Promise.all([
            authService.getAllUsers(),
            postService.getAllPosts() 
        ]);
        res.render('admin/dashboard', { 
            users: users,
            posts: posts,
            activePage: 'admin' 
        });

    } catch (error) {
        next(error);
    }
};

 //kullanıcıyı silme (Admin)
export const handleDeleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userIdToDelete = req.params.id; // URL'den silinecek kullanıcının ID'si
        const currentUserId = req.session.userId; // İşlemi yapan adminin ID'si

        // Adminin kendini silmesini engelliyoruz
        if (userIdToDelete === currentUserId) {
            // TODO: Kendini silemezsin mesajını flash mesaj olarak göstermek daha iyi olur
            console.warn(`Admin (${currentUserId}) kendini silmeye çalıştı.`);
            return res.redirect('/admin/dashboard?error=cannotDeleteSelf'); // Hata query param ile geri dön
        }
        await authService.deleteUser(userIdToDelete);
        res.redirect('/admin/dashboard?userDeleted=true');

    } catch (error) {
        // Hata olursa genel hata yöneticisine gönder
        // TODO: Hata mesajını flash mesaj olarak göstermek daha iyi olur
        console.error("Admin - Kullanıcı silme hatası:", error);
        res.redirect(`/admin/dashboard?error=${encodeURIComponent((error as Error).message)}`); // Hata mesajıyla geri dön
        // Veya: next(error); // Genel 500 sayfasına gönderir
    }
};


 // postu silme Admin 
export const handleDeletePostAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postIdToDelete = req.params.id;
        await postService.deletePost(postIdToDelete);
        res.redirect('/admin/dashboard?postDeleted=true');

    } catch (error) {
        console.error("Admin - Post silme hatası:", error);
        res.redirect(`/admin/dashboard?error=${encodeURIComponent((error as Error).message)}`); 
    }
};

