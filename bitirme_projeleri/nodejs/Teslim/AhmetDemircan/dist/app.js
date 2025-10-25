"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const index_1 = __importDefault(require("./routes/index"));
const auth_1 = __importDefault(require("./routes/auth"));
const categories_1 = __importDefault(require("./routes/categories"));
// @ts-ignore
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const api_1 = __importDefault(require("./routes/api"));
const blog_1 = __importDefault(require("./routes/blog"));
const authController_1 = require("./controllers/authController");
const news_1 = __importDefault(require("./routes/news"));
require("./models/categoriesModel"); // Category modelini kaydet (populate için gerekli)
const express_session_1 = __importDefault(require("express-session"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const adminInitializer = require('./config/admiSeed');
adminInitializer(); // Uygulama başlarken varsayılan admini oluştur
// View engine: EJS (ortama göre doğru klasörü bul)
const candidateViewPaths = [
    path_1.default.join(__dirname, 'views'), // ts-node-dev (src/views)
    path_1.default.join(process.cwd(), 'src', 'views'), // prod: dist -> src/views
    path_1.default.join(process.cwd(), 'views') // kök: views/
];
const viewsDir = candidateViewPaths.find((p) => fs_1.default.existsSync(p)) || candidateViewPaths[1];
app.set('views', viewsDir);
app.set('view engine', 'ejs');
// Statik dosyalar
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Body parsing
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Yeni: session middleware (EJS/web için)
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'dev_secret_change_me',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 1000 }
}));
// Kullanıcı bilgisini EJS'e geçir (session’dan veya JWT fallback)
app.use(authController_1.attachUserToLocals);
app.use('/', index_1.default);
app.use('/auth', auth_1.default);
app.use('/categories', categories_1.default);
app.use('/blogs', blog_1.default);
app.use('/news', news_1.default);
app.use('/api', api_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// 404 handler: API için JSON, web için EJS
app.use(errorHandler_1.notFoundHandler);
// Global error handler (en sonda)
app.use(errorHandler_1.errorHandler);
exports.default = app;
if (process.env.NODE_ENV === 'development') {
    app.get('/api/dev-cast', (_req, _res, next) => next(Object.assign(new Error('bad'), { name: 'CastError' })));
    app.get('/api/dev-validation', (_req, _res, next) => next(Object.assign(new Error('validation'), {
        name: 'ValidationError', errors: { title: { message: 'Başlık zorunlu' } }
    })));
    app.get('/api/dev-500', (_req, _res, next) => next(new Error('Boom')));
    app.get('/dev-500', (_req, _res, next) => next(new Error('Boom')));
}
