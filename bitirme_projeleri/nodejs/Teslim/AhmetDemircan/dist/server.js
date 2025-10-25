"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
dotenv_1.default.config();
async function start() {
    try {
        await (0, db_1.connectDB)();
        const requestedPort = Number(process.env.PORT ?? 3000);
        const logListening = (srv) => {
            const addr = srv.address();
            const actualPort = typeof addr === 'string' ? addr : addr?.port;
            console.log(`Sunucu http://localhost:${actualPort} üzerinde çalışıyor`);
            console.log(`Swagger dokümantasyonu: http://localhost:${actualPort}/api-docs`);
        };
        const server = app_1.default.listen(requestedPort);
        server.on('listening', () => logListening(server));
        server.on('error', (err) => {
            if (err?.code === 'EADDRINUSE') {
                const fallbackPort = requestedPort + 1;
                console.warn(`Port ${requestedPort} kullanımda, ${fallbackPort} deneniyor...`);
                const fbServer = app_1.default.listen(fallbackPort);
                fbServer.on('listening', () => logListening(fbServer));
                fbServer.on('error', (e) => {
                    console.error('Başlatma hatası (fallback):', e);
                    process.exit(1);
                });
            }
            else {
                console.error('Başlatma hatası:', err);
                process.exit(1);
            }
        });
    }
    catch (err) {
        console.error('Başlatma hatası:', err);
        process.exit(1);
    }
}
start();
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Üretimde burada process.exit(1) tercih edebilirsiniz
});
