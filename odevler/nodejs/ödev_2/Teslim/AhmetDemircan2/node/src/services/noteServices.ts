import NoteDB, { INote } from "../models/noteModel";

export const addNote = async (noteData: { title: string, detail: string, userId: string }) => {
    try {
        const newNote = new NoteDB(noteData);
        await newNote.save();
        return true;
    } catch (error) {
        console.error("addNote error:", error);
        return false;
    }
}

export const getNotesByUserId = async (userId: string) => {
    try {
        const notes = await NoteDB.find({ userId }).sort({ date: -1 });
        return notes;
    } catch (error) {
        console.error("getNotesByUserId error:", error);
        return [];
    }
}

export const deleteNoteById = async (noteId: string, userId: string) => {
    try {
        const result = await NoteDB.deleteOne({ _id: noteId, userId });
        return result.deletedCount > 0;
    } catch (error) {
        console.error("deleteNoteById error:", error);
        return false;
    }
}

export const resetAllNotes = async (userId: string) => {
    try {
        await NoteDB.deleteMany({ userId });
        return true;
    } catch (error) {
        console.error("resetAllNotes error:", error);
        return false;
    }
}