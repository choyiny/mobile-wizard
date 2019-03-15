export abstract class Action {
  name: string;
  timestamp: number;
  actor: number;

  protected constructor(name: string) {
    this.name = name;
    this.timestamp = Date.now();
    this.actor = -1;
  }

  public setActor(user: number) {
    this.actor = user;
  }

}
