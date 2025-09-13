import express from "express";
import { addNote, getUserNotes } from "../services/dashboardService";


export const dashboardController = express.Router();

dashboardController.get("/", async (req, res) => {
  const session = req.session.item;
  if (session) {
    const notes = await getUserNotes(session._id.toString()) || [];
    res.render("dashboard", { user: session, notes });
  } else {
    res.redirect("/");
  }
});

dashboardController.post("/note", async (req, res) => {
  const session = req.session.item;
  if (session) {
    const { title, detail, date, color } = req.body;
    await addNote(session._id.toString(), title, detail, date, color);
    res.redirect("/dashboard");
  } else {
    res.redirect("/");
  }
});
