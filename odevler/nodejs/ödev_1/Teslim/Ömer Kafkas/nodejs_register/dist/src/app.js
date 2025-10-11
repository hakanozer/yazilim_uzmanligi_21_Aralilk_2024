"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// ...existing code...
const app = (0, express_1.default)();
const PORT = 3000;
//EJS Configuration
// Use project root aware views path so both `ts-node` (src) and built `dist` work
const viewsPath = path_1.default.join(process.cwd(), 'src', 'views');
app.set("views", viewsPath);
app.set("view engine", "ejs");
// Body parsing
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//İmport controllers
const userController_1 = require("./controllers/userController");
//user controller
app.use("/", userController_1.userController);
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
//# sourceMappingURL=app.js.map