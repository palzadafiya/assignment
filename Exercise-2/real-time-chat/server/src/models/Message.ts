export class Message {
  public readonly content: string;
  public readonly senderId: string;
  public readonly senderName: string;
  public readonly timestamp: Date;

  constructor(content: string, senderId: string, senderName: string) {
    this.content = content;
    this.senderId = senderId;
    this.senderName = senderName;
    this.timestamp = new Date();
  }
}