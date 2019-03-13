import {ActionProcessor} from '../processor/action-processor';

export class Detector {

  constructor(processor: ActionProcessor) {
    window.ondevicemotion = function(e) {
      const motion = {
        x: e.acceleration.x,
        y: e.acceleration.y,
        z: e.acceleration.z,
        a: e.rotationRate.alpha,
        b: e.rotationRate.beta,
        g: e.rotationRate.gamma
      };
      processor.add_action(motion);
    };
  }
}
