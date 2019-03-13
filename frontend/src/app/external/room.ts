export class Room {
  hostid: string;

  constructor(json: {
    hostid: string,
  }) {
    this.hostid = json.hostid;
  }
}
