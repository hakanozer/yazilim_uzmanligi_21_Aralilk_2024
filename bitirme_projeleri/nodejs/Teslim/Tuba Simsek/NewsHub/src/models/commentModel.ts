import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    content: string; 
    author: mongoose.Types.ObjectId; 
    postId: mongoose.Types.ObjectId; 
    isActive: boolean; 
    like: number;     
    dislike: number;   
    lastUpdatedBy?: mongoose.Types.ObjectId; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

const CommentSchema: Schema<IComment> = new Schema({
    content: {
        type: String,
        required: true,
        minlength: [3, 'Yorum en az 3 karakter olmalıdır.'],    
        maxlength: [1000, 'Yorum en fazla 1000 karakter olabilir.'] 
    },
    author: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: { 
        type: Schema.Types.ObjectId,
        ref: 'Post', 
        required: true
    },
    isActive: { 
        type: Boolean,
        default: false 
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: { 
        type: Number,
        default: 0
    },
    lastUpdatedBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
},
{
    timestamps: true
})

const CommentDB = mongoose.model<IComment>('Comment', CommentSchema);
export default CommentDB;