import {Strike} from './strike';
import {Throw} from './throw';

export class ActionProcessor {

  actions: object;
  lock: boolean;

  constructor(private observer) {
    this.actions = {x: [], y: [], z: [], a: [], b: [], g: []};
    this.lock = false;
  }

  public add_action(data) {
    if (this.lock) { return; }
    data.forEach((val, key, self) => {
      if (key in this.actions) { this.actions[key].push(val); }
    });
    const l = this.actions['x'].length;
    if (this.actions['y'][l - 1] > 70 || this.actions['x'][l - 1] > 70) {
      this.on_action_data();
    }
  }

  private is_throw(lx) {
    // let l = this.actions['x'].length;
    const lxpos = this.actions['x'].lastIndexOf(lx);
    const cores_y = this.actions['y'][lxpos];
    const cores_g = this.actions['g'][lxpos];
    return (lx <= -65 && cores_y > 65 && cores_g > 500);
  }

  private is_strike(ly, my) {
    const lxpos = this.actions['y'].lastIndexOf(ly);
    const mypos = this.actions['y'].lastIndexOf(my);
    const cores_g = this.actions['g'][mypos];

    // lypos > mypos since reversed
    return (my > 60 && ly < -20 && lxpos < mypos && Math.abs(cores_g) < 500);
  }

  private on_action_data() {
    if (this.lock) { return; }
    this.lock = true;
    const lx = Math.min.apply(null, this.actions['x']);
    const mx = Math.max.apply(null, this.actions['x']);
    const ly = Math.min.apply(null, this.actions['y']);
    const my = Math.max.apply(null, this.actions['y']);
    const lz = Math.min.apply(null, this.actions['z']);
    const mz = Math.max.apply(null, this.actions['z']);
    if (this.is_strike(ly, my)) {
      this.clear();
      // Call listener with new action
      this.observer(new Strike());
      this.lock = false;
    } else if (this.is_throw(lx)) {
      this.clear();
      // Call listener with new action
      this.observer(new Throw());
      this.lock = false;
    } else {
      this.lock = false;
    }
  }

  private clear() {
    this.actions = {x: [], y: [], z: [], a: [], b: [], g: []};
  }
}
