import app from './app';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

async function start() {
  try {
    await connectDB();

    const requestedPort = Number(process.env.PORT ?? 3000);
    const logListening = (srv: import('http').Server) => {
      const addr = srv.address();
      const actualPort = typeof addr === 'string' ? addr : addr?.port;
      console.log(`Sunucu http://localhost:${actualPort} üzerinde çalışıyor`);
      console.log(`Swagger dokümantasyonu: http://localhost:${actualPort}/api-docs`);
    };

    const server = app.listen(requestedPort);
    server.on('listening', () => logListening(server));
    server.on('error', (err: any) => {
      if (err?.code === 'EADDRINUSE') {
        const fallbackPort = requestedPort + 1;
        console.warn(`Port ${requestedPort} kullanımda, ${fallbackPort} deneniyor...`);
        const fbServer = app.listen(fallbackPort);
        fbServer.on('listening', () => logListening(fbServer));
        fbServer.on('error', (e: any) => {
          console.error('Başlatma hatası (fallback):', e);
          process.exit(1);
        });
      } else {
        console.error('Başlatma hatası:', err);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error('Başlatma hatası:', err);
    process.exit(1);
  }
}

start();

process.on('unhandledRejection', (reason: any) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  // Üretimde burada process.exit(1) tercih edebilirsiniz
});