import { Schema } from "mongoose";
import NoteDB, { INoteModel } from "../models/noteModel";
import { Request } from "express";

export const noteAdd = async (note: INoteModel, req: Request) => {
    try {
        note.userID = req.session.item._id
        const newNote = new NoteDB(note)
        await newNote.save()
        return true
    } catch (error) {
        return "Note Add Fail";
    }
}