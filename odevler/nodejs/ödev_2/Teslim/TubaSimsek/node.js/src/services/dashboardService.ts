import DashboardDB, { IDashboard } from "../models/dashboardModel";

export const addNote = async (userId: string, title: string, detail: string, date?: Date, color?: string) => {
  try {
    const newNote = new DashboardDB({ userId, title, detail, date, color })
    await newNote.save()
    return true
  } catch (err) {
    console.error("addNote error:", err)
    return false
  }
};

export const getUserNotes = async (userId: string) => {
  try {
    const notes = await DashboardDB.find({ userId }).sort({ date: -1 })
    return notes
  } catch (err) {
    console.error("getUserNotes error:", err)
    return []
  }
};
