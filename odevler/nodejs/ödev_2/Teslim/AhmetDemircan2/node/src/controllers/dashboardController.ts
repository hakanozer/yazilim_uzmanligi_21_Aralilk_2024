import express from "express"
import { addNote, getNotesByUserId, deleteNoteById, resetAllNotes } from "../services/noteServices"

export const dashboardController = express.Router()

dashboardController.get("/", async (req, res) => {
    const session = req.session.item
    if (session) {
        const notes = await getNotesByUserId(session._id as string)
        res.render('dashboard', { user: session, notes })
    } else {
        res.redirect('/')
    }
})

dashboardController.post("/add-note", async (req, res) => {
    const session = req.session.item
    if (!session) {
        return res.redirect('/')
    }
    
    const { title, detail } = req.body
    if (!title || !detail) {
        const notes = await getNotesByUserId(session._id as string)
        return res.render('dashboard', { 
            user: session, 
            notes, 
            error: "Title and detail are required" 
        })
    }
    
    const result = await addNote({ title, detail, userId: session._id as string })
    if (result) {
        res.redirect('/dashboard')
    } else {
        const notes = await getNotesByUserId(session._id as string)
        res.render('dashboard', { 
            user: session, 
            notes, 
            error: "Failed to add note" 
        })
    }
})

dashboardController.post("/delete-note/:id", async (req, res) => {
    const session = req.session.item
    if (!session) {
        return res.redirect('/')
    }
    
    const noteId = req.params.id
    await deleteNoteById(noteId, session._id as string)
    res.redirect('/dashboard')
})

dashboardController.post("/reset-notes", async (req, res) => {
    const session = req.session.item
    if (!session) {
        return res.redirect('/')
    }
    
    await resetAllNotes(session._id as string)
    res.redirect('/dashboard')
})


