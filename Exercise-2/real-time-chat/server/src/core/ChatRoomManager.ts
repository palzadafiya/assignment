import { ChatRoom } from './ChatRoom';

export class ChatRoomManager {
  private static instance: ChatRoomManager;
  private rooms: Map<string, ChatRoom> = new Map();

  private constructor() {}

  public static getInstance(): ChatRoomManager {
    if (!ChatRoomManager.instance) {
      ChatRoomManager.instance = new ChatRoomManager();
    }
    return ChatRoomManager.instance;
  }

  public getOrCreateRoom(roomId: string): ChatRoom {
    if (!this.rooms.has(roomId)) {
      const newRoom = new ChatRoom(roomId);
      this.rooms.set(roomId, newRoom);
    }
    return this.rooms.get(roomId)!;
  }
}