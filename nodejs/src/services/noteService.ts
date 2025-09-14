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

export const deleteNote = async (req: Request, noteID: string) => {
        try {
        const deleteStatus = await NoteDB.deleteOne({ _id: noteID, userID: req.session.item._id})
        return true
    } catch (error) {
        return false
    }
}

export const getOneNote = async (req: Request, noteID: string) => {
    try {
        const oneNote = await NoteDB.findOne({ _id: noteID, userID: req.session.item._id})
        return oneNote
    } catch (error) {
        return null
    }
}

export const noteUpdate = async (note: INoteModel, req: Request) => {
    try {
        const updateStatus = await NoteDB.updateOne(
            { _id: note._id, userID: req.session.item._id},
            {
                $set: {
                    title: note.title,
                    detail: note.detail,
                    date: note.date,
                    color: note.color
                }
            }
        )
        return true
    } catch (error) {
        return "Note Update Fail";
    }
}