import mongoose, { Document, Schema } from 'mongoose';

export interface INoteModel extends Document {
    userID: any,
    title: string,
    detail: string,
    date: Date,
    color: string
}

const noteSchema: Schema<INoteModel> = new Schema({
    userID: { type: Schema.Types.ObjectId, ref:'User', required: true },
    title: { type: String, required: true, minlength: 2, maxlength: 100 },
    detail: { type: String, required: true, minlength: 2, maxlength: 1000 },
    date: { type: Date, required: true},
    color: { type: String, required: true}
})

export const NoteDB = mongoose.model<INoteModel>('Note', noteSchema)
export default NoteDB                                