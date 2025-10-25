import { Request, Response, NextFunction } from 'express';
import * as postService from '../../services/web/postService';
import * as commentService from '../../services/web/commentService';
import { PostCategory } from '../../models/postModel'; 
import { validationResult } from 'express-validator';


// Anasayfayı render eder. db'den tüm postları çeker ve view'a gönder
export const showHomePage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postService.getAllPosts();
        res.render('home', {
            posts: posts,
            activePage: 'home'
        });
    } catch (error) {
        next(error)
    }
}

export const showNewPostForm = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render('posts/new', {
            error: null,
            categories: Object.values(PostCategory),
            oldInput: { title: '', content: '', category: '' },
            activePage: 'newPost'
        })
    } catch (e) {
        next(e);
    }
}

 //Yeni post oluşturma (Validasyonıu).
export const handleCreatePost = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Validasyon sonuçlarını kontrol et
    const errors = validationResult(req);
    const { title, content, category } = req.body;
    const authorId = req.session.userId;

    // 2. Eğer validasyon hatası varsa...
    if (!errors.isEmpty()) {
        return res.status(400).render('posts/new', {
            errors: errors.array(), 
            oldInput: { title, content, category }, 
            categories: Object.values(PostCategory),
            error: null,
            activePage: 'newPost'
        })
    }
    // 3. Validasyon hatası yoksa devam et...
    if (!authorId) { }
    try {
        let imageUrl: string | undefined = undefined;
        const file = (req as any).file as Express.Multer.File | undefined;
        if (file) { imageUrl = file.filename; }
        await postService.createPost(title.trim(), content.trim(), authorId, category, imageUrl);
        res.redirect('/dashboard');
    } catch (error) {
        if (error instanceof Error && error.message.startsWith('Hata: Sadece resim dosyaları')) {
             return res.status(400).render('posts/new', { /* ... (multer hatası render) ... */ });
         }
         next(error)
    }
}

 //Kullanıcının dashboard sayfası
export const showDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.session.userId
        if (!userId) {
            return res.redirect('/login')
        }
        const userPosts = await postService.getPostsByAuthor(userId)
        res.render('dashboard', {
            posts: userPosts,
            activePage: 'dashboard' 
        });
    } catch (error) {
        next(error);
    }
};

 //Post detay sayfası
export const showPostDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id
        const [post, comments] = await Promise.all([
            postService.getPostById(postId),
            commentService.getCommentsByPostId(postId)
        ])
        if (!post) {
            const error: any = new Error("Yazı bulunamadı.");
            error.status = 404;
            return next(error); 
        }
        res.render('posts/detail', {
            post: post,
            comments: comments,
            activePage: 'post' 
        });
    } catch (error) {
        next(error);
    }
};

  
 // Post düzenleme sayfasını, mevcut post bilgileri ve kategorilerle render eder
export const showEditPostForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id;
        const post = await postService.getPostById(postId);
        if (!post) {
            const error: any = new Error("Düzenlenecek yazı bulunamadı.");
            error.status = 404;
            return next(error);
        }
        res.render('posts/edit', {
            post: post, 
            categories: Object.values(PostCategory), 
            error: null, 
            activePage: 'editPost' 
        });
    } catch (error) {
        next(error);
    }
};

 // Düzenlenen post formundan gelen veriyi işler (Validasyonlu).
export const handleUpdatePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = req.session.userId; 
    // 1. Validasyon sonuçlarını kontrol et
    const errors = validationResult(req);
    const { title, content, category } = req.body;

    // 2. Eğer validasyon hatası varsa...
    if (!errors.isEmpty()) {
       
        const post = await postService.getPostById(postId); 
        return res.status(400).render('posts/edit', {
            errors: errors.array(), 
            post: post, 
            oldInput: { title, content, category }, 
            categories: Object.values(PostCategory),
            error: null,
            activePage: 'editPost'
        })
    }

    // 3. Validasyon hatası yoksa devam et...
    if (!userId) { /* ... (giriş kontrolü) ... */ }

    try {
        let imageUrl: string | undefined = undefined;
        const file = (req as any).file as Express.Multer.File | undefined;
        if (file) { imageUrl = file.filename; }

        const updateData = {
            title: title.trim(),
            content: content.trim(),
            category,
            imageUrl: imageUrl
        };

        if (imageUrl === undefined) {
             const existingPost = await postService.getPostById(postId);
             updateData.imageUrl = existingPost?.imageUrl;
        }

        const updatedPost = await postService.updatePost(postId, updateData);
        if (!updatedPost) { /* ... (post bulunamadı hatası) ... */ }

        res.redirect(`/posts/${postId}`);

    } catch (error) {
        // Multer veya Servis hatası
         if (error instanceof Error && error.message.startsWith('Hata: Sadece resim dosyaları')) {
             const post = await postService.getPostById(postId);
             return res.status(400).render('posts/edit', { /* ... (multer hatası render) ... */ });
         }
         next(error); 
    }
};


 //post'u sil
export const handleDeletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postId = req.params.id;
        await postService.deletePost(postId);
        res.redirect('/dashboard');
    } catch (error) {
        next(error); 
    }
};

