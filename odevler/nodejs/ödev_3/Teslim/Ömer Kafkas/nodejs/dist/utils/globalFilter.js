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
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalFilter = void 0;
const noteService_1 = require("../services/noteService");
const globalFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.url;
    const urls = ['/', '/login', '/register'];
    let loginStatus = true;
    urls.forEach((item) => {
        if (item == url) {
            loginStatus = false;
        }
    });
    if (loginStatus) {
        // oturum denetimi yap
        const session = req.session.item;
        if (session) {
            const notesFive = yield (0, noteService_1.getLastFiveNotes)(req);
            if (notesFive != null) {
                res.locals.notesFive = notesFive;
            }
            res.locals.user = session;
            next();
        }
        else {
            res.redirect('/');
        }
    }
    else {
        // oturum denetimi yapma
        next(); // alması gereken hizmeti alsın
    }
});
exports.globalFilter = globalFilter;
//# sourceMappingURL=globalFilter.js.map