import express from "express"

export const dashboardController = express.Router();

dashboardController.get('/', (req,res) => {
    res.render('dashboard')
})