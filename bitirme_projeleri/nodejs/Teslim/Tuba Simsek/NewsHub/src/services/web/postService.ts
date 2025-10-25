import PostDB, { IPost } from '../../models/postModel'; 
import mongoose from 'mongoose';
import { PostCategory } from '../../models/postModel';
import CommentDB from '../../models/commentModel'; 

export const createPost = async (
    title: string, 
    content: string, 
    authorId: string, 
    category: PostCategory, 
    imageUrl?: string
): Promise<IPost> => { 
    try {
       
        const newPostData = { 
            title,
            content,
            author: authorId, 
            category,
            imageUrl: imageUrl || undefined 
        };
       
        const newPost = new PostDB(newPostData);
        return await newPost.save();
    } catch (error) {
        console.error("Post oluşturulurken veritabanı hatası:", error);
        if (error instanceof mongoose.Error.ValidationError) {
             throw new Error("Lütfen tüm zorunlu alanları doğru şekilde doldurun.");
        }
        throw new Error("Yazı kaydedilirken bir sorun oluştu.");
    }
};

export const getAllPosts = async (): Promise<IPost[]> => {
    try {
        const posts = await PostDB.find()
            .populate('author', 'name') 
            .sort({ createdAt: -1 }); 
        return posts;
    } catch (error) {
        console.error("Tüm postlar getirilirken hata:", error);
        throw new Error("Yazılar yüklenirken bir sorun oluştu."); 
    }
};

export const getPostsByAuthor = async (authorId: string): Promise<IPost[]> => {
    try {
        
        const posts = await PostDB.find({ author: authorId })
            .sort({ createdAt: -1 }); 
        return posts;
    } catch (error) {
        console.error("Yazara ait postlar getirilirken hata:", error);
        throw new Error("Yazılarınız yüklenirken bir sorun oluştu.");
    }
};


export const getPostById = async (postId: string): Promise<IPost | null> => {
    try {
       
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return null; 
        }
        
       
        const post = await PostDB.findById(postId).populate('author', 'name');
        return post;
    } catch (error) {
        console.error("ID'ye göre post getirilirken hata:", error);
        throw new Error("Yazı yüklenirken bir sorun oluştu.");
    }
};

export const updatePost = async (
    postId: string,
    data: { title: string; content: string; category: PostCategory; imageUrl?: string }
): Promise<IPost | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return null;
        }
        
        return await PostDB.findByIdAndUpdate(postId, data, { new: true, runValidators: true }); // runValidators: Modeldeki kuralları uygulamaya yarıyor
    } catch (error) {
        console.error("Post güncellenirken hata:", error);
        if (error instanceof mongoose.Error.ValidationError) {
             throw new Error("Lütfen tüm zorunlu alanları doğru şekilde doldurun.");
        }
        throw new Error("Yazı güncellenirken bir sorun oluştu.");
    }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            throw new Error("Geçersiz yazı ID'si.");
        }
      
        await CommentDB.deleteMany({ post: postId });

        // Sonra postu sil
        const result = await PostDB.findByIdAndDelete(postId);
        if (!result) {
            throw new Error("Silinecek yazı bulunamadı.");
        }
        console.log(`Post (${postId}) ve ilişkili yorumlar silindi.`); // Loglama ! :(

    } catch (error) {
        console.error("Post silinirken hata:", error);
        throw new Error("Yazı silinirken bir sorun oluştu.");
    }
};


