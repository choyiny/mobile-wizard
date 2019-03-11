export abstract class Action {
  name: string;
  timestamp: number;
  actor?: string;

  constructor(name: string) {
    this.name = name;
    this.timestamp = Date.now();
    this.actor = null;
  }

  public getName(): string {
    return this.name;
  }

  public getTimestamp(): number {
    return this.timestamp;
  }

  public setActor(user: string) {
    this.actor = user;
  }

}
