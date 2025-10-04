import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
    content: string;
    createdAt: Date; //otomatik çekilecek
    updatedAt: Date; //otomatik çekilecek
    lastUpdatedById: mongoose.Types.ObjectId; //en son yorumu düzenleyenn id si tutulacak
    userId: mongoose.Types.ObjectId; // Yorumu yazanın id si
    newsId: mongoose.Types.ObjectId; // Yorumun ait olduğu haberin id si
    isActive: boolean; //bu değer admin tarafından yorumu aktif yapmak için kullanılır
    like: number;
    dislike: number;
}

const commentSchema = new Schema<IComment>({
    content: { type: String, required: true, minlength: 20, maxlength: 250 }, //Yorum için max ve min standardı eklendi
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastUpdatedById: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: false },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    newsId: { type: Schema.Types.ObjectId, ref: "News", required: true },
});

//Otomatik tarih alımı ara katmanı (veri tabanına kayıttan önce uğranan katman, kanca)
commentSchema.pre("save", function (next) { // save olmadan önce çalışması için ayarlı "pre save"
    if (this.isModified() && !this.isNew) {
        this.updatedAt = new Date();
    }
    next();
});

const CommentDB = mongoose.model<IComment>('Comment', commentSchema); // Comment modeli oluşturuldu

export default CommentDB; // dışa aktarıldı (kullanıma hazır)

