import { Router, Request, Response } from 'express'
import { profileUpdate } from "../services/profileService"

export const profileController = Router()

profileController.get("/", (req: Request, res: Response) => {
    res.render('profile', { user: req.session.item })
})

profileController.post('/', async (req: Request, res: Response) => {
    const result = await profileUpdate(req)
    if (result === true) {
        res.render('profile', { user: req.session.item, success: 'Profile updated successfully!' })
    } else {
        res.render('profile', { user: req.session.item, error: result })
    }
})