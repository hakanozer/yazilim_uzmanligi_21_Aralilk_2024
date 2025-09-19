import express  from "express"
import { profilePasswordUpdate, profileUpdate } from "../services/profileService"

export const profileController = express.Router()

profileController.get("/", (req, res) => {
    res.render('profile')
})

profileController.post("/", async (req, res) => {
   const result = await profileUpdate(req);
   res.render("profile", { ...result, user: req.session.item });
});

profileController.post("/password", async (req, res) => {
   const result = await profilePasswordUpdate(req);
   res.render("profile", { ...result, user: req.session.item });
});