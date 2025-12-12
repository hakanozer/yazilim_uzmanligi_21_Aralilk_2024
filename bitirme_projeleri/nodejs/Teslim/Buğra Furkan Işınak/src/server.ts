import app from './app';
import connectDB from './config/db';
import { initializeDefaultData } from './config/adminSeed';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Initialize default data (admin user and categories)
initializeDefaultData();

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🌐 API: http://localhost:${PORT}/api`);
  logger.info(`📚 Swagger: http://localhost:${PORT}/api-docs`);
  logger.info(`📝 Log file: ${logger.getLogFile()}`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API: http://localhost:${PORT}/api`);
  console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
  console.log(`📝 Log file: ${logger.getLogFile()}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log('💥 Unhandled Rejection! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.log('💥 Uncaught Exception! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
