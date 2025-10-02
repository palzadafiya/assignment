import WebSocket from "ws";
import { ICommunicationAdapter } from "./ICommunicationAdapter";
import { logger } from "../services/Logger";

export class WebSocketAdapter implements ICommunicationAdapter {
  constructor(private ws: WebSocket) {}

  public sendMessage(payload: any): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    } else {
      logger.warn(
        "Attempted to send message to a closed WebSocket connection."
      );
    }
  }
}
