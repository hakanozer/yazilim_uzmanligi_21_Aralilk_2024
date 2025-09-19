import express from "express";
import { profileUpdate, passwordUpdate } from "../services/profileService";

export const profileController = express.Router()

profileController.get("/", (req, res) => {
    res.render("profile", { user: req.session.item })
});

profileController.post("/", async (req, res) => {
    if (req.body.name || req.body.email) {
        // Profil güncelleme
        const status = await profileUpdate(req);
        if (status === true) {
            res.render("profile", { user: req.session.item, success: "Profile updated successfully." })
        } else {
            res.render("profile", { user: req.session.item, error: status })
        }
    } else if (req.body.newPassword || req.body.confirmPassword) {
        // Şifre güncelleme
        const status = await passwordUpdate(req)
        if (status === true) {
            res.render("profile", { user: req.session.item, success: "Password updated successfully." })
        } else {
            res.render("profile", { user: req.session.item, error: status })
        }
    }
});
