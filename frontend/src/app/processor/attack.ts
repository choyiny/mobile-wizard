import {Action} from './action';

export class Attack extends Action {
  damage: number;
  dfrange: number;

  constructor(name: string, damage: number, dfrange: number) {
    super(name);
    this.damage = damage;
    this.dfrange = dfrange;
  }

  public getDamage(): number {
    return this.damage;
  }

  public getDfrange(): number {
    return this.dfrange;
  }
}
