import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

import { ChatRoomManager } from './src/core/ChatRoomManager';
import { User } from './src/core/User';
import { WebSocketAdapter } from './src/adapters/WebSocketAdapter';
import { logger } from './src/services/Logger';
import { handleWebSocketError } from './src/utils/errorHandler';
import { ChatRoom } from './src/core/ChatRoom';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const chatRoomManager = ChatRoomManager.getInstance();

wss.on('connection', (ws: WebSocket) => {
  const userId = uuidv4();
  let currentUser: User | null = null;
  let currentRoom: ChatRoom | null = null;
  
  logger.info(`Client connected with temporary ID: ${userId}`);

  ws.on('message', (rawMessage: string) => {
    try {
      const message = JSON.parse(rawMessage);
      logger.info('Received message', message);

      switch (message.type) {
        case 'joinRoom':
          const { roomId, userName } = message.payload;
          if (!roomId || !userName) {
            throw new Error('roomId and userName are required to join a room.');
          }

          const adapter = new WebSocketAdapter(ws);
          currentUser = new User(userId, userName, adapter);
          
          currentRoom = chatRoomManager.getOrCreateRoom(roomId);
          currentRoom.addUser(currentUser);
          break;

        case 'sendMessage':
          const { content } = message.payload;
          if (currentRoom && currentUser && content) {
            currentRoom.postMessage(content, currentUser);
          } else {
            throw new Error('User must join a room before sending messages.');
          }
          break;
        
        default:
          logger.warn(`Unknown message type received: ${message.type}`);
          break;
      }
    } catch (error) {
      handleWebSocketError(ws, error as Error, 'message processing');
    }
  });

  ws.on('close', () => {
    if (currentUser && currentRoom) {
      currentRoom.removeUser(currentUser);
      logger.info(`Client disconnected: ${currentUser.name} (${currentUser.id})`);
    } else {
        logger.info(`Client with temporary ID ${userId} disconnected without joining a room.`);
    }
  });

  ws.on('error', (error) => {
    handleWebSocketError(ws, error, 'connection error');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});