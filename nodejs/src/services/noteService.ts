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

// son yüklenmiş 5 noteyi getir
export const getLastFiveNotes = async (req: Request) => {
    try {
        const notes = await NoteDB.find({ userID: req.session.item._id })
            .sort({date: -1})
            .limit(5);
        return notes;
    } catch (error) {
        return null
    }
};

export const getAllNotes = async (req: Request) => {
    try {
        const notes = await NoteDB.find({ userID: req.session.item._id })
            .sort({date: -1});
        return notes;
    } catch (error) {
        return null
    }
};