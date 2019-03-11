import {Action} from './action';

export class Attack extends Action {
	constructor(private name: string, private damage: int, private dfrange: int) {
		super(name);
	}

	public getDamage(): int {
		return this.damage;
	}

	public getDfrange(): int {
		return this.dfrange;
	}
}
