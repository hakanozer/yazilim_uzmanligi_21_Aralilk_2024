import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
    title: string;
    detail: string;
    date: Date;
    color: string;
    userId: mongoose.Schema.Types.ObjectId;
}

const NoteSchema: Schema<INote> = new Schema({
    title: { type: String, required: true },
    detail: { type: String, required: true },
    date: { type: Date, required: true },
    color: { type: String, required: true },
    //ref: user ile foreignkey eklemiş olduk. userId'yi user tablosundaki id ile işledik.
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const NoteDB = mongoose.model<INote>("Note", NoteSchema);

export default NoteDB;