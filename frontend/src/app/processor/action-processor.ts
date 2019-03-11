import {Throw, Strike} from './action';

export class ActionProcessor {

	constructor(privte observer) {
		this.actions = {x:[], y:[], z:[], a:[], b:[], g:[]};
		this.lock = false;
	}

	public add_action(data) {
		if(this.lock) return;
		data.forEach((val, key, self) =>{
			if(key in this.actions) this.actions[key].push(val);
		});
		let l = this.actions['x'].length;
		if(this.actions['y'][l-1] > 70 || this.actions['x'][l-1] > 70)
			this.on_action_data();
	}

	private is_throw(lx) {
		// let l = this.actions['x'].length;
		let lxpos = this.actions['x'].lastIndexOf(lx);
        let cores_y = this.actions['y'][lxpos];
        let cores_g = this.actions['g'][lxpos];
        cx = (lx <= -65 && cores_y > 65 && cores_g > 500);
        if(cx)
            console.log('*****Throw ' + dx[0] + ' ' + cores_y + ' ' + cores_g);
        return cx;
	}

	private is_strike(ly, my) {
		let lxpos = this.actions['y'].lastIndexOf(ly);
        let mypos = this.actions['y'].lastIndexOf(my);
        let cores_g = this.actions['g'][mypos];
        console.log(dy + ' lpos: ' + lypos + ' rpos: '+ mypos ' g: '+ cores_g);
        # lypos > mypos since reversed
        cy = (my > 60 && ly < -20 && lypos < mypos && abs(cores_g) < 500);
        if(cy)
            print('*****STRIKE ' + dy + ' ' + cores_g);
        return cy;
	}

	private on_action_data() {
		if(this.lock) return;
		this.lock = true;
		let lx = Math.min.apply(null, this.actions['x']);
		let mx = Math.max.apply(null, this.actions['x']);
		let ly = Math.min.apply(null, this.actions['y']);
		let my = Math.max.apply(null, this.actions['y']);
		let lz = Math.min.apply(null, this.actions['z']);
		let mz = Math.max.apply(null, this.actions['z']);
		if(this.is_strike(ly, my)) {
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
		this.actions = {x:[], y:[], z:[], a:[], b:[], g:[]};
	}
}
