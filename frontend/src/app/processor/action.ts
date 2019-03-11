export abstract class Action {

  constructor(private name: string) {
    this.timestamp = Date.now();
    this.actor = null;
  }

  public getName(): string {
  	return this.name;
  }

  public getTimestamp(): int {
  	return this.timestamp;
  }

  public setActor(user: string) {
  	this.actor = user;
  }

}
