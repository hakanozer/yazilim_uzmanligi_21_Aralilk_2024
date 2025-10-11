"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//EJS Configuration
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// body-parser config
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// import controllers
const userController_1 = require("./controllers/userController");
// user controller
app.use('/', userController_1.userController);
app.listen(PORT, () => {
    console.log(`Server on: http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map