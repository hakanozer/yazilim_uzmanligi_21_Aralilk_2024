"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = void 0;
const express_1 = __importDefault(require("express"));
const profileService_1 = require("../services/profileService");
exports.profileController = express_1.default.Router();
exports.profileController.get("/", (req, res) => {
    res.render('profile');
});
exports.profileController.post('/', (req, res) => {
    (0, profileService_1.profileUpdate)(req);
    res.render('profile');
});
//# sourceMappingURL=profileController.js.map