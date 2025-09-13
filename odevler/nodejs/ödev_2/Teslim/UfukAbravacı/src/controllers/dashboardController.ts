import express from "express";
import NoteDB from "../models/noteModel";

export const dashboardController = express.Router();

// kullanıcının ekli notları varsa onlarla beraber dashboardı açıoyruz.
dashboardController.get("/", async (req, res) => {
    const session = req.session.item;
    if (session) {
        // kullanıcının notlarını bulduk
        const notes = await NoteDB.find({ userId: session._id });
        res.render("dashboard", { notes });
    } else {
        res.redirect("/");
    }
});

// Dashboard not ekleme
dashboardController.post("/addNote", async (req, res) => {
    const session = req.session.item;
    if (!session) {
        return res.redirect("/");
    }
    const { title, detail, date, color } = req.body;
    try {
        console.log(session)
        const newNote = new NoteDB({
            title,
            detail,
            date,
            color,
            userId: session._id// notu kimin eklediği
            //formdaki name alanlarıyla buradaki alan adları eşleşmeli.
        });
        await newNote.save();
        // Kayıttan sonra tekrar dashboard'a dön
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.render("dashboard", { error: "Note could not be saved" });
    }
});