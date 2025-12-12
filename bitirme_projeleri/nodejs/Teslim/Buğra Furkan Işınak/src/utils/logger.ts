import fs from 'fs';
import path from 'path';

export class Logger {
  private logFile: string;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.logFile = path.join(process.cwd(), 'logs', `session-${this.sessionId}.log`);
    this.ensureLogDirectory();
    this.logSessionStart();
  }

  private generateSessionId(): string {
    return new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];
  }

  private ensureLogDirectory(): void {
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
  }

  private logSessionStart(): void {
    const startMessage = `\n=== SESSION STARTED: ${new Date().toISOString()} ===\n`;
    fs.appendFileSync(this.logFile, startMessage);
  }

  private writeLog(level: string, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}`;
    
    if (data) {
      const dataStr = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
      fs.appendFileSync(this.logFile, `${logEntry}\n${dataStr}\n`);
    } else {
      fs.appendFileSync(this.logFile, `${logEntry}\n`);
    }
  }

  info(message: string, data?: any): void {
    this.writeLog('INFO', message, data);
    console.log(`[INFO] ${message}`);
  }

  error(message: string, error?: any): void {
    this.writeLog('ERROR', message, error);
    console.error(`[ERROR] ${message}`, error);
  }

  warn(message: string, data?: any): void {
    this.writeLog('WARN', message, data);
    console.warn(`[WARN] ${message}`, data);
  }

  debug(message: string, data?: any): void {
    this.writeLog('DEBUG', message, data);
    console.log(`[DEBUG] ${message}`, data);
  }

  apiCall(method: string, url: string, statusCode: number, duration?: number): void {
    const message = `${method} ${url} - ${statusCode}${duration ? ` (${duration}ms)` : ''}`;
    this.writeLog('API', message);
  }

  database(operation: string, collection: string, data?: any): void {
    const message = `DB ${operation} on ${collection}`;
    this.writeLog('DATABASE', message, data);
  }

  auth(action: string, user?: any): void {
    const message = `AUTH ${action}`;
    this.writeLog('AUTH', message, user);
  }

  getLogFile(): string {
    return this.logFile;
  }

  getSessionId(): string {
    return this.sessionId;
  }
}

// Global logger instance
export const logger = new Logger();
