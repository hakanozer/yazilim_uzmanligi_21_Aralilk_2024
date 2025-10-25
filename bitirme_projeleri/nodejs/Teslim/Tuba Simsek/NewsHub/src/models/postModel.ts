import mongoose, { Document, Schema } from 'mongoose';

export enum PostCategory {
    TEKNOLOJI = 'Teknoloji',
    BILIM = 'Bilim',
    YAPAY_ZEKA = 'Yapay Zekâ',
    KULTUR = 'Kültür',
    GUNDEM = 'Gündem',
    DIGER = 'Diğer'
}

export interface IPost extends Document {
    title: string;
    content: string;
    imageUrl?: string;
    category: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
    comments: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date; 
}

const PostSchema: Schema<IPost> = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minlength: 2
    },
    imageUrl: {
        type: String,
        required: false
    },
    category: { 
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
        
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Comment' 
    }]
  
},
{
    timestamps: true 
})

const PostDB = mongoose.model<IPost>('Post', PostSchema); 
export default PostDB;