import express from "express";
import NoteDB from "../models/noteModels";

export const dashboardController = express.Router();


dashboardController.get("/", async (req, res) => {
    const session = req.session.item;
    if (session) {
        
        const notes = await NoteDB.find({ userId: session._id });
        res.render("dashboard", { notes });
    } else {
        res.redirect("/");
    }
});


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
            userId: session._id
            
        });
        await newNote.save();
        
        res.redirect("/dashboard");
    } catch (error) {
        console.error(error);
        res.render("dashboard", { error: "Note could not be saved" });
    }
});