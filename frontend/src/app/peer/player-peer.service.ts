import { Injectable } from '@angular/core';
import {Action} from '../processor/action';
// @ts-ignore
import Peer from 'peerjs';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {RoomService} from '../external/room.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerPeerService {

  private host: Peer.DataConnection;
  private peer: Peer;
  public playerId: number;
  private playerIdListeners = [];
  private statsListeners = [];

  public myName = '';

  constructor(private roomService: RoomService) {
    this.host = null;
    this.peer = null;
  }

  public sendAction(action: Action) {
    action.setActor(this.playerId);
    const data = {
      type: 'action',
      action: JSON.stringify(action)
    };
    this.host.send(data);
  }

  public connectToHost(id: string, name: string) {
    this.myName = name;

    const promise = new Promise((resolve, reject) => {
      this.roomService.getRoom(id).subscribe(
        (data) => {
          // {'host_id': room.get('host_id')}
          const hostId = data['host_id'];
          // If one peer server opened before, disconnect that.
          if (this.peer !== null) {
            this.peer.disconnect();
          }
          // Always establish a new server
          this.peer = new Peer(environment.peerserver);
          this.host = this.peer.connect(hostId, {metadata: {name: name}, serialization: 'json'});
          this.attachHostListeners();
          resolve();
        },
        () => {
          reject();
        });
    });

    return promise;
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
        this.playerIdListeners.forEach( (listener) => {
          listener({'type': 'playerId', 'playerId': this.playerId});
        });
      } else if (data.type === 'gamestats') {
        console.log('Ready to update stats');
        this.statsListeners.forEach((listener) => {
          listener(data);
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

      if (eventName === 'playerId') {
        this.playerIdListeners.push(handler);
      } else if (eventName === 'gamestats') {
        this.statsListeners.push(handler);
      }

      return () => {};
    });
  }
}
