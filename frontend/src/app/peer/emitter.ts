import { Subject } from 'rxjs';

export class Emitter {
  private subjects;

  constructor() {
    this.subjects = {};
  }

  private createName(name) {
    return '$' + name;
  }

  private validateSubjectNames(fnName) {
    if (!this.subjects[fnName]) {
      this.subjects[fnName] = new Subject();
    }
  }

  public emit(name, data) {
    const fnName = this.createName(name);
    this.validateSubjectNames(fnName);
    this.subjects[fnName].next(data);
  }

  public listen(name, handler) {
    const fnName = this.createName(name);
    this.validateSubjectNames(fnName);
    return this.subjects[fnName].subscribe(handler);
  }


  public dispose() {
    const subjects = this.subjects;
    for (const prop in subjects) {
      if (subjects.hasOwnProperty(prop)) {
        subjects[prop].dispose();
      }
    }
    this.subjects = {};
  }
}
