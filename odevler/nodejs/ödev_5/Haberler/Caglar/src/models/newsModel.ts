import mongoose, {Schema} from "mongoose";

export interface INews {
    title: string;
    content: string;
    category?: string;
    author: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const newsSchema: Schema<INews> = new Schema({
    title: {type: String, required: true, minlength: 2, trim: true},
    content: {type: String, required: true, minlength: 2},
    category: {type: String, trim: true, maxlength: 100},
    author: {type: Schema.Types.ObjectId, ref: "User", required: true} // User referansı
}, {
    timestamps: true // createdAt ve updatedAt otomatik yönetilir. Serviste bu değerlerle uğraşmamıza gerek yok.    
})

const news = mongoose.model<INews>("News", newsSchema);
export default news;