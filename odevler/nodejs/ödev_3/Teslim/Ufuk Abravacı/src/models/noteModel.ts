import mongoose, { Document, Schema } from "mongoose";

export interface INoteModel extends Document {
    userID: any,
    title: string,
    detail: string,
    date: Date,
    color: string
}

const noteSchema: Schema<INoteModel> = new Schema({ 
    userID: {type: Schema.Types.ObjectId, ref:'User', required: true},
    title: {type: String, required: true, minLength: 2, maxLength: 100},
    detail: {type: String, required: true, minLength: 2, maxLength: 500},
    date: {type: Date, required: true},
    color: {type: String, required: true}
})

const NoteDB = mongoose.model<INoteModel>('Note', noteSchema)

export default NoteDB