import express  from "express"
import { INoteModel } from "../models/noteModel"
import { getAllNotes, noteAdd } from "../services/noteService"

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

