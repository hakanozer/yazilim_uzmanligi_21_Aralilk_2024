import { Request, Response } from "express";
import { createNote } from "../services/noteService";
import { INote } from "../models/noteModel";

export const noteController = {
  addNote: async (req: Request, res: Response) => {
    try {
      const noteData: INote = req.body;
      const savedNote = await createNote(noteData);
      res.status(201).json(savedNote);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },
};