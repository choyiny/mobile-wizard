import {Strike} from './strike';
import {Throw} from './throw';
import {Defense} from './defense';

export class ActionProcessor {

  actions: object;
  lock: boolean;
  private lastThrow;
  private lastStrike;
  private lastDefense;

  constructor(private observer) {
    this.actions = {x: [], y: [], z: [], a: [], b: [], g: []};
    this.lock = false;
    this.lastDefense = -1;
    this.lastStrike = -1;
    this.lastThrow = -1;
  }

  public add_action(data: object) {
    if (this.lock) { return; }
    for (const key in data) {
      if (data[key]) {
        const value = data[key];
        if (key in this.actions) {
          this.actions[key].push(value);
        }
      }
    }
    const l = this.actions['x'].length;
    if (!this.lock &&
      (this.actions['y'][l - 1] > 70 || this.actions['x'][l - 1] > 70 || this.actions['z'][l - 1] < -30)) {
      this.lock = true;
      this.on_action_data();
    }
  }

  private is_throw(lx) {
    // Only consider last 20 data
    const lxpos = this.actions['x'].slice(-20).lastIndexOf(lx);
    if (lxpos < 0) {
      return false;
    }
    const cores_y = this.actions['y'].slice(-20)[lxpos];
    const cores_g = this.actions['g'].slice(-20)[lxpos];
    return (lx <= -65 && cores_y > 65 && cores_g > 500);
  }

  private is_strike(ly, my) {
    // Only consider last 20 data
    const lxpos = this.actions['y'].slice(-20).lastIndexOf(ly);
    const mypos = this.actions['y'].slice(-20).lastIndexOf(my);
    if (lxpos < 0 || mypos < 0) {
      return false;
    }
    const cores_g = this.actions['g'].slice(-20)[mypos];

    // lypos > mypos since reversed
    return (my > 60 && ly < -20 && lxpos < mypos && Math.abs(cores_g) < 500);
  }

  private is_defense() {
    // Only consider max z value in last 20 data
    const l = this.actions['z'].length;
    const lst = this.actions['z'].slice(-20);
    const mz = Math.max.apply(null, lst);
    const mzpos = this.actions['z'].lastIndexOf(mz);

    const lz = this.actions['z'][l - 1];
    const miny = Math.min.apply(null, this.actions['y'].slice(mzpos));
    const maxx = Math.max.apply(null, this.actions['x'].slice(mzpos));
    const maxa  = Math.max.apply(null, this.actions['a'].slice(mzpos));
    const maxb  = Math.max.apply(null, this.actions['b'].slice(mzpos));
    const maxg  = Math.max.apply(null, this.actions['g'].slice(mzpos));
    return lz < -30 && miny > 0 && maxx < 0 && maxa < 0 && maxb < 0 && maxg < 0;
  }

  private on_action_data() {
    const lx = Math.min.apply(null, this.actions['x'].slice(-20));
    const ly = Math.min.apply(null, this.actions['y'].slice(-20));
    const my = Math.max.apply(null, this.actions['y'].slice(-20));
    if (this.is_strike(ly, my)) {
      this.clear();
      this.lock = false;
      // Call listener with new action
      const act = new Strike();
      const lastAction = this.lastStrike;
      // Only consider current action as valid when last same action
      // is before 0.5s
      if (lastAction < 0 || act.timestamp - lastAction >= 500) {
        this.lastStrike = act.timestamp;
        this.observer(act);
      }

    } else if (this.is_throw(lx)) {
      this.clear();
      this.lock = false;
      // Call listener with new action
      const act = new Throw();
      const lastAction = this.lastThrow;
      // Only consider current action as valid when last same action
      // is before 0.5s
      if (lastAction < 0 || act.timestamp - lastAction >= 500) {
        this.lastThrow = act.timestamp;
        this.observer(act);
      }
    } else if (this.is_defense()) {
      this.clear();
      this.lock = false;
      const act = new Defense();
      const lastAction = this.lastDefense;
      // Only consider current action as valid when last same action
      // is before 0.5s
      if (lastAction < 0 || act.timestamp - lastAction >= 500) {
        this.lastDefense = act.timestamp;
        this.observer(act);
      }
    } else {
      this.lock = false;
    }
  }

  private clear() {
    this.actions = {x: [], y: [], z: [], a: [], b: [], g: []};
  }
}
