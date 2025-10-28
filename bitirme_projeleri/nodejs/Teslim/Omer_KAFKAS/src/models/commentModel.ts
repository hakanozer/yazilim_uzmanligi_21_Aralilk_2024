import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    news: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
    content: {
        type: String,
        required: [true, 'Yorum içeriği gerekli'],
        trim: true,
        minlength: [1, 'Yorum en az 1 karakter olmalı'],
        maxlength: [1000, 'Yorum en fazla 1000 karakter olabilir']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Yazar bilgisi gerekli']
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'News',
        required: [true, 'Haber bilgisi gerekli']
    }
}, {
    timestamps: true
});

// Index'ler
commentSchema.index({ news: 1, createdAt: -1 }); // Habere göre yorumları sıralı getir
commentSchema.index({ author: 1 }); // Kullanıcının yorumlarını getir

const CommentDb = mongoose.model<IComment>('Comment', commentSchema);

export default CommentDb;
