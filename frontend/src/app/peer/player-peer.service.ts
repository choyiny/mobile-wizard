import { Injectable } from '@angular/core';
import {Action} from '../processor/action';
// @ts-ignore
import Peer from 'peerjs';
import {environment} from '../../environments/environment';
import {GameService} from '../helpers/game.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerPeerService {

  private host: Peer.DataConnection;
  private peer: Peer;
  public playerId: number;
  private hostListeners = [];

  constructor() {
    this.host = null;
    this.peer = new Peer({
        host: environment.peerserver.host,
        port: environment.peerserver.port,
        key: environment.peerserver.key
      });
  }

  public sendAction(action: Action) {
    this.host.send({
      type: 'action',
      name: action.name,
      timestamp: action.timestamp,
      actor: this.playerId,
    });
  }

  public connectToHost(id: string) {
    this.host = this.peer.connect(id);
    this.attachHostListeners();
  }

  public inGame() {
    return this.host !== null;
  }

  private attachHostListeners() {
    this.host.on('data', data => {
      console.log(data);
      if (data.type === 'setPlayerId') {
        this.playerId = data['playerId'];
        console.log(`I am player ${this.playerId}`);
        this.hostListeners.forEach( (listener) => {
          listener({'type': 'playerId', 'playerId': this.playerId});
        });
      }
    });
    this.host.on('close', () => {
      this.host.close();
      this.host = null;
    });
  }

  public fromEvent(eventName) {
    return new Observable((observer) => {
      const handler = (e) => {
        observer.next(e);
      };

      if (eventName === 'host') {
        this.hostListeners.push(handler);
      }

      return () => {};
    });
  }
}
