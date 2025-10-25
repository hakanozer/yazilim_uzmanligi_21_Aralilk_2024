import mongoose, { Document, Schema } from "mongoose";

export interface INewsModel extends Document {
    userID: any,
    title: string,
    detail: string,
    date: Date,
    color: string
}

const newsSchema: Schema<INewsModel> = new Schema ({
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true, minlength: 2, maxLength: 20},
    detail: {type: String, required: true, minlength: 2, maxLength: 500},
    date: {type:Date, required: true},
    color: {type: String, required: true}
})

const NewsDB = mongoose.model<INewsModel>('news', newsSchema)

export default NewsDB