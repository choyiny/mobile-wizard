import { Injectable } from '@angular/core';
import {Action} from '../processor/action';

@Injectable({
  providedIn: 'root'
})
export class PlayerPeerService {

  private host: string;

  constructor() { }

  public sendAction(action: Action) {

  }
}
