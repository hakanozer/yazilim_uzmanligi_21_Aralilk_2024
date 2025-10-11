import express  from "express"
import { INoteModel } from "../models/noteModel"
import { deleteNote, getAllNotes, getOneNote, noteAdd, noteUpdate, searchNotes } from "../services/noteService"
import { RegexControll } from "../utils/Regex"

export const dashboardController = express.Router()

dashboardController.get("/", async (req, res) => {
    const notes = await getAllNotes(req)
    const arr = notes != null ? notes : []
    res.render('dashboard', {notes: arr})
})

dashboardController.post('/noteAdd', async (req, res) => {
    const note:INoteModel = req.body
    const status = await noteAdd(note, req)
    res.render('dashboard', {status: status})
})

dashboardController.get('/noteDelete/:id', async(req, res) => {
    const noteID = req.params.id
    await deleteNote(req, noteID)
    res.redirect('/dashboard')
})

dashboardController.get('/noteEdit/:id', async(req, res) => {
    const noteID = req.params.id
    const note =  await getOneNote(req, noteID)
    if (note == null) {
        res.redirect('/dashboard')
        return
    }else {
        res.render('noteUpdate', {note: note})
    }
})

dashboardController.post("/noteUpdate", async (req, res) => {
    const note: INoteModel = req.body
    const status = await noteUpdate(note, req)
    res.redirect('/dashboard')
})

// Get search query from dashboard
dashboardController.get('/search', async (req, res) => {
    const query = req.query.q as string;
    
    if (!query || query.trim() === '') {
        console.log("Empty search query.");
        return res.redirect('/dashboard'); 
    }
    
    // Regex kontrolü ekle
    if (!RegexControll(query)) {
        console.log("Invalid search query:", query);
        return res.redirect('/dashboard');
    }
    
    console.log("Search query:", query);
    
    // Arama yap ve sonuçları al
    const searchResults = await searchNotes(req, query);
    
    // Sonuçları frontend'e gönder
    return res.render('dashboard', {
        search: query,           // Arama terimi
        searchResults: searchResults, // Arama sonuçları
        isSearching: true        // Arama yapıldığını belirtmek için
    });
})


