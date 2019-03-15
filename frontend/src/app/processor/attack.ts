import {Action} from './action';

export class Attack extends Action {
  damage: number;
  dfrange: number;

  constructor(name: string, damage: number, dfrange: number) {
    super(name);
    this.damage = damage;
    this.dfrange = dfrange;
  }
}
