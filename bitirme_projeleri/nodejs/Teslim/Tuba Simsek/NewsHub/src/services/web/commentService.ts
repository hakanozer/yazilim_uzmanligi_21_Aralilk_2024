import CommentDB, { IComment } from '../../models/commentModel';
import PostDB from '../../models/postModel';
import mongoose from 'mongoose';

export const getCommentsByPostId = async (postId: string): Promise<IComment[]> => {
    try {
       
        const comments = await CommentDB.find({ post: postId })
            .populate('author', 'name')
            .sort({ createdAt: -1 }); // 
        return comments;
    } catch (error) {
        console.error("Posta ait yorumlar getirilirken hata:", error);
        throw new Error("Yorumlar yüklenirken bir sorun oluştu.");
    }
};


export const createComment = async (text: string, authorId: string, postId: string): Promise<IComment> => {
    try {
        // 1. Yeni yorum dökümanını oluştur
        const newComment = new CommentDB({
            text,
            author: authorId,
            post: postId
        });
        // Yorumu kaydet
        const savedComment = await newComment.save();

        // 2. Kaydedilen yorumun ID'sini ilgili post'un 'comments' dizisine ekle
        // ($push operatörü, dizinin sonuna eleman ekler)
        await PostDB.findByIdAndUpdate(postId, {
            $push: { comments: savedComment._id }
        });

        // Kaydedilen yorumu döndür
        return savedComment;

    } catch (error) {
        console.error("Yorum oluşturulurken veritabanı hatası:", error);
        throw new Error("Yorum kaydedilirken bir sorun oluştu.");
    }
};

export const deleteComment = async (commentId: string): Promise<void> => {
    try {
        // ID'nin geçerli olup olmadığını kontrol et
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            throw new Error("Geçersiz yorum ID'si.");
        }

        // 1. Önce yorumu bulup hangi posta ait olduğunu öğrenelim
        const comment = await CommentDB.findById(commentId);
        if (!comment) {
            throw new Error("Silinecek yorum bulunamadı.");
        }
        const postId = comment.postId; // Post ID'sini al

        // 2. Yorumu 'comments' koleksiyonundan sil.
        const deleteResult = await CommentDB.findByIdAndDelete(commentId);
        if (!deleteResult) { // Eğer silme başarısız olursa (örn: yorum zaten silinmişse)
             throw new Error("Yorum silinemedi veya zaten silinmiş.");
        }


        // 3. Yorumun referansını comments dizisinden kaldın
        await PostDB.findByIdAndUpdate(postId, {
            $pull: { comments: commentId }
        });
        
        console.log(`Yorum (${commentId}) ve Post (${postId}) referansı silindi.`); //log

    } catch (error) {
        console.error("Yorum silinirken hata:", error);
        throw new Error("Yorum silinirken bir sorun oluştu.");
    }
};
