import type { Request } from "express";
import type { noteModel } from "../models/noteModel.ts";
import noteDB from "../models/noteModel.ts";

// Not Ekle
export const noteAdd = async (note:noteModel, req:Request) => {
    try {
    note.userID = req.session.item?._id
    const newNote = new noteDB(note)
    await newNote.save()
    return true
    } catch (error) {
        return "Note Add Fail"
    }
}