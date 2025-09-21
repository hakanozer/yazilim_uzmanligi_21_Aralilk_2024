import express  from "express"
import { INoteModel } from "../models/noteModel"
import { deleteNote, getAllNotes, getOneNote, noteAdd, noteUpdate } from "../services/noteService"

export const dashboardController = express.Router()

dashboardController.get("/", async (req, res) => {
    const notes = await getAllNotes(req)
    const arr = notes != null ? notes : []
    res.render('dashboard', {notes: arr})
})

dashboardController.post('/noteAdd', async (req, res) => {
    const note:INoteModel = req.body
    const status = await noteAdd(note, req)
    res.render('dashboard', {status: status})
})

dashboardController.get('/noteDelete/:id', async(req, res) => {
    const noteID = req.params.id
    await deleteNote(req, noteID)
    res.redirect('/dashboard')
})

dashboardController.get('/noteEdit/:id', async(req, res) => {
    const noteID = req.params.id
    const note =  await getOneNote(req, noteID)
    if (note == null) {
        res.redirect('/dashboard')
        return
    }else {
        res.render('noteUpdate', {note: note})
    }
})

dashboardController.post("/noteUpdate", async (req, res) => {
    const note: INoteModel = req.body
    const status = await noteUpdate(note, req)
    res.redirect('/dashboard')
})

