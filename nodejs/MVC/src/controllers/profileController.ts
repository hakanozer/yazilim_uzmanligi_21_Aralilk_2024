import express  from "express"
import { profileUpdate } from "../services/profileService"

export const profileController = express.Router()

profileController.get("/", (req, res) => {
    res.render('profile')
})

profileController.post('/', (req, res) => {
    profileUpdate(req)
    res.render('profile')
})