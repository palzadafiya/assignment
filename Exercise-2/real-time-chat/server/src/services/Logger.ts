export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, context?: any) {
    const timestamp = new Date().toISOString();
    console.log(
      `${timestamp} [${level}] - ${message}` +
      (context ? `\nContext: ${JSON.stringify(context, null, 2)}` : '')
    );
  }

  public info(message: string, context?: any) {
    this.log(LogLevel.INFO, message, context);
  }

  public warn(message: string, context?: any) {
    this.log(LogLevel.WARN, message, context);
  }

  public error(message: string, error?: Error, context?: any) {
    console.error(
        `${new Date().toISOString()} [${LogLevel.ERROR}] - ${message}` +
        (context ? `\nContext: ${JSON.stringify(context, null, 2)}` : '') +
        (error ? `\nError: ${error.stack}` : '')
    );
  }
}

export const logger = Logger.getInstance();