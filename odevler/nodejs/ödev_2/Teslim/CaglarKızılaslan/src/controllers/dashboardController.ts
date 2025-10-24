import express from "express"
import type { noteModel } from "../models/noteModel.ts";
import { noteAdd } from "../services/noteServices.ts";

export const dashboardController = express.Router();

dashboardController.get('/', (req,res) => {
    res.render('dashboard')
})

dashboardController.post('/noteAdd', async (req,res) => {
    const note:noteModel = req.body
   const status = await noteAdd(note, req)
   console.log(status)
    res.render('dashboard')
})