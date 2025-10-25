import { Request, Response, NextFunction } from 'express';
import * as commentService from '../../services/web/commentService';
import { validationResult } from 'express-validator'; 
import * as postService from '../../services/web/postService'; 

//Yeni bir yorum oluşturma isteğini işler (Validasyonlu).
export const handleCreateComment = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id; 
    const authorId = req.session.userId; 
    const { text } = req.body; 

    // 1. Validasyon sonuçlarını kontrol et
    const errors = validationResult(req);

    // 2. Eğer validasyon hatası varsa...
    if (!errors.isEmpty()) {
        try {
            const [post, comments] = await Promise.all([
                postService.getPostById(postId),
                commentService.getCommentsByPostId(postId)
            ]);
            if (!post) { 
                 const err: any = new Error("Yorum yapılacak yazı bulunamadı."); err.status = 404; return next(err);
            }
            return res.status(400).render('posts/detail', {
                post: post,
                comments: comments,
                commentErrors: errors.array(), 
                oldCommentInput: text, 
                error: null, 
                activePage: 'post'
            });
        } catch (fetchError) {
            return next(fetchError);
        }
    }

    // 3. Validasyon hatası yoksa devam et...
    if (!authorId) { }
    try {
        await commentService.createComment(text.trim(), authorId, postId);
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        next(error);
    }
};

 // yorum silme isteği
export const handleDeleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId, commentId } = req.params
        await commentService.deleteComment(commentId)
        res.redirect(`/posts/${postId}`);

    } catch (error) {
        next(error);
    }
};

