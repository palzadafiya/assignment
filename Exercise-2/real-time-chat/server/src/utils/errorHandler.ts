import WebSocket from 'ws';
import { logger } from '../services/Logger';

export function handleWebSocketError(ws: WebSocket, error: Error, operation: string) {
  logger.error(`Error during ${operation}`, error);
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      type: 'error',
      message: `An internal error occurred during ${operation}. Please try again.`
    }));
  }
}