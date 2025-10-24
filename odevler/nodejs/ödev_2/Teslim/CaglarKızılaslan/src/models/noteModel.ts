import mongoose, { Schema, type Document } from "mongoose";

export interface noteModel extends Document {
    userID: any,
    title: string,
    detail: string,
    date: Date,
    color: string
}
const noteSchema: Schema<noteModel> = new Schema({
    userID: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true, minLength: 2, maxlength:20},
    detail: {type: String, required: true, minlength: 2, maxlength:500},
    date: {type:Date, required:true},
    color: {type: String, required: true}
})

const noteDB = mongoose.model<noteModel>('note', noteSchema)

export default noteDB