import { ICommunicationAdapter } from '../adapters/ICommunicationAdapter';
import { IObserver } from '../patterns/IObserver';

export class User implements IObserver {
  public readonly id: string;
  public readonly name: string;
  private adapter: ICommunicationAdapter;

  constructor(id: string, name: string, adapter: ICommunicationAdapter) {
    this.id = id;
    this.name = name;
    this.adapter = adapter;
  }

  public update(data: any): void {
    this.adapter.sendMessage(data);
  }
}