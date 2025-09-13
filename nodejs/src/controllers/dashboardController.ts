import express  from "express"
import { INoteModel } from "../models/noteModel"
import { noteAdd } from "../services/noteService"

export const dashboardController = express.Router()

dashboardController.get("/", (req, res) => {
    res.render('dashboard')
})

dashboardController.post('/noteAdd', async (req, res) => {
    const note:INoteModel = req.body
    const status = await noteAdd(note, req)
    res.render('dashboard', {status: status})
})

