import { Injectable } from '@angular/core';
import {Action} from '../processor/action';
// @ts-ignore
import Peer from 'peerjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerPeerService {

  private host: Peer.DataConnection;
  private peer: Peer;
  private playerId: number;

  constructor() {
    const peer = new Peer({
        host: environment.peerserver.host,
        port: environment.peerserver.port,
        key: environment.peerserver.key
      });
    this.peer = peer;
    if (environment.peerserver.id) {
      // connect to the host
      this.host = peer.connect(environment.peerserver.id);

      // get my id from the host
      this.host.on('data', data => {
        console.log(data);
        if (data['type'] === 'setPlayerId') {
          this.playerId = data['playerId'];
          console.log(`I am player ${this.playerId}`);
        }
      });
    }
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
  }
}
