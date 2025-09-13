import { Schema } from "mongoose";

export interface INote extends Document{
    title: string;
    detail: string;
    date: Date;
    color: EXT_sRGB
}
const noteShema: Schema<INote> = new Schema({
    title: {type: String},
    detail:{type: String},
    date
})