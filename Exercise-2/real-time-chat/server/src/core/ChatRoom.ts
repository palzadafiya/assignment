import { ISubject } from '../patterns/ISubject';
import { IObserver } from '../patterns/IObserver';
import { User } from './User';
import { Message } from '../models/Message';
import { logger } from '../services/Logger';

export class ChatRoom implements ISubject {
  public readonly id: string;
  private observers: Map<string, IObserver> = new Map();
  private messages: Message[] = [];

  constructor(id: string) {
    this.id = id;
  }

  addObserver(observer: IObserver): void {
    const user = observer as User;
    if (!this.observers.has(user.id)) {
      this.observers.set(user.id, observer);
      logger.info(`User ${user.name} (${user.id}) joined room ${this.id}`);
    }
  }

  removeObserver(observer: IObserver): void {
    const user = observer as User;
    if (this.observers.has(user.id)) {
      this.observers.delete(user.id);
      logger.info(`User ${user.name} (${user.id}) left room ${this.id}`);
    }
  }

  notifyObservers(data: any): void {
    this.observers.forEach(observer => observer.update(data));
  }
  
  public addUser(user: User): void {
    this.addObserver(user);
    this.notifyUserListChange();

    user.update({
        type: 'messageHistory',
        payload: {
            roomId: this.id,
            messages: this.messages,
        },
    });
  }

  public removeUser(user: User): void {
    this.removeObserver(user);
    this.notifyUserListChange();
  }

  public postMessage(content: string, sender: User): void {
    const message = new Message(content, sender.id, sender.name);
    this.messages.push(message);

    if (this.messages.length > 100) {
      this.messages.shift();
    }
    
    logger.info(`New message in room ${this.id} from ${sender.name}`);
    this.notifyObservers({
      type: 'newMessage',
      payload: message,
    });
  }
  
  private notifyUserListChange(): void {
    const userList = Array.from(this.observers.values()).map(obs => {
        const u = obs as User;
        return { id: u.id, name: u.name };
    });

    this.notifyObservers({
        type: 'userListUpdate',
        payload: {
            roomId: this.id,
            users: userList,
        },
    });
  }
}