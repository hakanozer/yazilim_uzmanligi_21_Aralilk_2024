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
exports.dashboardController = void 0;
const express_1 = __importDefault(require("express"));
const noteService_1 = require("../services/noteService");
exports.dashboardController = express_1.default.Router();
exports.dashboardController.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield (0, noteService_1.getAllNotes)(req);
    const arr = notes != null ? notes : [];
    res.render('dashboard', { notes: arr });
}));
exports.dashboardController.post('/noteAdd', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = req.body;
    const status = yield (0, noteService_1.noteAdd)(note, req);
    res.render('dashboard', { status: status });
}));
exports.dashboardController.get('/noteDelete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteID = req.params.id;
    yield (0, noteService_1.deleteNote)(req, noteID);
    res.redirect('/dashboard');
}));
exports.dashboardController.get('/noteEdit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteID = req.params.id;
    const note = yield (0, noteService_1.getOneNote)(req, noteID);
    if (note == null) {
        res.redirect('/dashboard');
        return;
    }
    else {
        res.render('noteUpdate', { note: note });
    }
}));
exports.dashboardController.post("/noteUpdate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = req.body;
    const status = yield (0, noteService_1.noteUpdate)(note, req);
    res.redirect('/dashboard');
}));
//# sourceMappingURL=dashboardController.js.map