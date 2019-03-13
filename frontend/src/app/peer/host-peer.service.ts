import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
// @ts-ignore
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class HostPeerService {

  private players: object;
  private peer: Peer;
  private actionListener;
  constructor() {
    this.actionListener =  [];
    const peer = new Peer(environment.peerserver.id, {
        host: environment.peerserver.host,
        port: environment.peerserver.port,
        key: environment.peerserver.key
      });
    this.players = {};

    this.peer = peer;
    peer.on('open',  (id) => {
      console.log('Host ID: ' + id);
    });

    peer.on('connection', (conn) => {

      // handling data from the player
      conn.on('open', () => {
        // tell the player his id
        const playerId = Object.keys(this.players).length;
        console.log('assigning player ' + playerId);
        conn.send({type: 'setPlayerId', playerId: playerId});
      });

      // Host can only handle 2 players for now
      if (Object.keys(this.players).length < 2) {
        console.log(`${conn.peer} connected`);

        conn.on('data', (data) => {
          this.actionListener.forEach( (actionHandler) => {
            if (data.type === 'action') {
              actionHandler(data);
            }
          });
        });
        conn.on('error', (err) => {
          console.log(err);
        });
        this.players[conn.peer] = conn;
      }
    });
  }

  /*
  Return an action observable, any action received from players will be broadcast to subscribers.
   */
  public fromEvent(eventName) {
    return new Observable((observer) => {
      const handler = (e) => {
        observer.next(e);
      };

      if (eventName === 'action') {
        this.actionListener.push(handler);
      }
      return () => {};
    });
  }
}
