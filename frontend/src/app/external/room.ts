export class Room {
  id: string;
  name: string;

  constructor(json: {
    id: string,
    name: string
  }) {
    this.id = json.id;
    this.name = json.name;
  }
}
