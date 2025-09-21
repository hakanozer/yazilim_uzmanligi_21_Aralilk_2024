"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteUpdate = exports.getOneNote = exports.deleteNote = exports.getAllNotes = exports.getLastFiveNotes = exports.noteAdd = void 0;
const noteModel_1 = __importDefault(require("../models/noteModel"));
const noteAdd = (note, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        note.userID = req.session.item._id;
        const newNote = new noteModel_1.default(note);
        yield newNote.save();
        return true;
    }
    catch (error) {
        return "Note Add Fail";
    }
});
exports.noteAdd = noteAdd;
// son yüklenmiş 5 noteyi getir
const getLastFiveNotes = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteModel_1.default.find({ userID: req.session.item._id })
            .sort({ date: -1 })
            .limit(5);
        return notes;
    }
    catch (error) {
        return null;
    }
});
exports.getLastFiveNotes = getLastFiveNotes;
const getAllNotes = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield noteModel_1.default.find({ userID: req.session.item._id })
            .sort({ date: -1 });
        return notes;
    }
    catch (error) {
        return null;
    }
});
exports.getAllNotes = getAllNotes;
const deleteNote = (req, noteID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteStatus = yield noteModel_1.default.deleteOne({ _id: noteID, userID: req.session.item._id });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.deleteNote = deleteNote;
const getOneNote = (req, noteID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneNote = yield noteModel_1.default.findOne({ _id: noteID, userID: req.session.item._id });
        return oneNote;
    }
    catch (error) {
        return null;
    }
});
exports.getOneNote = getOneNote;
const noteUpdate = (note, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateStatus = yield noteModel_1.default.updateOne({ _id: note._id, userID: req.session.item._id }, {
            $set: {
                title: note.title,
                detail: note.detail,
                date: note.date,
                color: note.color
            }
        });
        return true;
    }
    catch (error) {
        return "Note Update Fail";
    }
});
exports.noteUpdate = noteUpdate;
//# sourceMappingURL=noteService.js.map