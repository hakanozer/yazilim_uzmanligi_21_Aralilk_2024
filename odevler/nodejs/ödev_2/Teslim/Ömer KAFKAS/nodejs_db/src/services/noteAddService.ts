import express from "express";
import mongoose from "mongoose";
import { INote, noteSchema } from "../models/noteModel";



const Note = mongoose.model<INote>("Note", noteSchema);
const router = express.Router();

// Yeni not ekleme
router.post("/notes", async (req, res) => {
  try {
    const note = new Note(req.body);
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
