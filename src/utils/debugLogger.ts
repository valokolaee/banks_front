// src/utils/debugLogger.ts
export class DebugLogger {
  static log(moduleName: string, message: string = 'Loaded') {
    const timestamp = new Date().toISOString();
    const logEntry = `[DEBUG] ${timestamp} | ${moduleName} | ${message}`;
    
    console.log(logEntry);
    
// If you want to send it to the server later or store it in an array
// you can add it here
  }
}