import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
    title: string,
    detail: string,
    date: Date,
    userId: string
}

const NoteSchema: Schema<INote> = new Schema({
    title: {type: String, required: true},
    detail: {type: String, required: true},
    date: {
        type: Date,
        default: () => {
            const now = new Date();
            return now.setHours(now.getHours() + 3)
        }
    },
    userId: {type: String, required: true}
})

const NoteDB = mongoose.model<INote>('Note', NoteSchema)

export default NoteDB