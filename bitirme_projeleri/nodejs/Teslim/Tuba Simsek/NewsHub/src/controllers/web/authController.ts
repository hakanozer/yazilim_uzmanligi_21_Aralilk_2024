import { Request, Response, NextFunction } from 'express';
import * as authService from '../../services/web/authService'; 
import { validationResult } from 'express-validator';
import { eRoles } from '../../utils/eRoles';

export const showLoginPage = (req: Request, res: Response) => {
    try {
        res.render('auth/login', { 
            errors: [],
            oldInput: { email: '' },
            error: null
        });
    } catch (e: any) {
        console.error("showLoginPage EJS render error:", e);
        res.status(500).send("Giriş sayfası yüklenirken bir hata oluştu: " + e.message);
    }
};
 
export const showRegisterPage = (req: Request, res: Response) => {
    try {
        res.render('auth/register', { 
            errors: [],
            oldInput: { name: '', email: '' },
            error: null
        });
    } catch (e: any) {
        console.error("showRegisterPage EJS render error:", e);
        res.status(500).send("Kayıt sayfası yüklenirken bir hata oluştu: " + e.message);
    }
};

 //Kayıt formundan gelen veriyi işler.
 //Validasyon hatalarını kontrol eder.
export const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Validasyon sonuçlarını kontrol et
    const errors = validationResult(req);
    const { name, email, password } = req.body;

    // 2. Eğer validasyon hatası varsa...
    if (!errors.isEmpty()) {
        return res.status(400).render('auth/register', {
            errors: errors.array(), // Hataları dizi olarak view'a gönder
            oldInput: { name, email }, // Parolayı geri gönderme!
            error: null // Genel hata olmadığı için null
        });
    }

    // 3. Validasyon hatası yoksa, kullanıcıyı kaydetmeye çalış
    try {
        await authService.registerUser({ name, email, password });
        res.redirect('/login?registered=true'); 
    } catch (error: any) {
        // Servisten gelen hataları (örn: "Email zaten kullanılıyor" gibi custom error) yakala
        // veya beklenmedik veritabanı hatalarını yakala ve genel hata yöneticisine gönder
        console.error("Kayıt sırasında hata:", error); // Hatayı logla
        res.status(500).render('auth/register', {
             errors: [], // Validasyon hatası değil, genel hata
             oldInput: { name, email },
             error: error.message || "Kayıt sırasında beklenmedik bir hata oluştu." 
        })
    }
}


//Giriş formundan gelen veriyi işler. Validasyon hatalarını ve login hatalarını kontrol eder.
export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Validasyon sonuçlarını kontrol et
    const errors = validationResult(req);
    const { email, password } = req.body;

    // 2. Eğer validasyon hatası varsa...
    if (!errors.isEmpty()) {
        return res.status(400).render('auth/login', {
            errors: errors.array(), // Hataları dizi olarak gönder
            oldInput: { email }, // Sadece email'i geri gönder
            error: null // Genel hata (catch bloğu) olmadığı için null
        });
    }

    // 3. Validasyon hatası yoksa, giriş yapmayı dene
    try {
    const user = await authService.loginUser(email, password);
    // ---> LOG 1: Kullanıcı verisini kontrol et <---
    console.log('Login - Fetched User:', JSON.stringify(user, null, 2));

    req.session.userId = user._id.toString();
    req.session.userRoles = user.roles; 

    // ---> LOG 2: Session'ı kontrol et <---
    console.log('Login - Session Set:', JSON.stringify(req.session, null, 2));

    res.redirect('/dashboard');

    } catch (error: any) {
        res.status(401).render('auth/login', { 
             errors: [],
             oldInput: { email },
             error: error.message || "Giriş sırasında beklenmedik bir hata oluştu." 
        })
    }
}


//Kullanıcı çıkışını yapar, session'ı sonlandırır.
export const handleLogout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Session sonlandırılamadı.", err);    // Hata olsa bile kullanıcıyı güvenli bir yere yönlendir
            return res.redirect('/'); 
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/login'); // 
    });
};



 //Giriş yapan kullanıcı profil sayfası
export const showProfilePage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.redirect('/login');
        }
        const user = await authService.getUserById(userId);
        if (!user) {
            req.session.destroy(() => {}); // Hatalı session'ı temizle
            return res.redirect('/login');
        }
        res.render('profile/view', { // profile klasörü altında view.ejs
            userData: user, // Kullanıcı verisini view'a gönder
            activePage: 'profile' // Sidebar için
        });

    } catch (error) {
        next(error);
    }
};


 //Profil düzenleme formu
export const showEditProfileForm = async (req: Request, res: Response, next: NextFunction) => {
     try {
        const userId = req.session.userId;
        if (!userId) { return res.redirect('/login'); }
        const user = await authService.getUserById(userId);
        if (!user) {
            req.session.destroy(() => {});
            return res.redirect('/login');
        }
        res.render('profile/edit', {
            userData: user,
            error: null, 
            errors: [], 
            oldInput: { name: user.name, email: user.email }, // Formu doldurmak için
            activePage: 'profile'
        });

    } catch (error) {
        next(error);
    }
};

// Profil düzenleme formundan gelen veriyi işler. Validasyon hatalarını kontrol eder.
export const handleUpdateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session.userId;
    const { name, email } = req.body;

    if (!userId) { return res.redirect('/login'); }

    // 1. Validasyon sonuçlarını kontrol et
    const errors = validationResult(req);

    // 2. Eğer validasyon hatası varsa...
    if (!errors.isEmpty()) {
        const user = await authService.getUserById(userId); // Mevcut veriyi tekrar çek
        return res.status(400).render('profile/edit', {
            errors: errors.array(), 
            userData: user, 
            error: null,
            oldInput: { name, email },
            activePage: 'profile'
        })
    }
    // 3. Validasyon hatası yoksa, güncellemeye çalış
    try {
        await authService.updateUserProfile(userId, { name: name.trim(), email: email.trim() });
        res.redirect('/profile?updated=true'); 

    } catch (error: any) {
        const user = await authService.getUserById(userId); 
        res.status(400).render('profile/edit', {
             error: error.message || "Profil güncellenirken bir hata oluştu.", 
             userData: user,
             errors: [], // Validasyon hatası değil
             oldInput: { name, email }, 
             activePage: 'profile'
        });
      
    }
};