import {Injectable} from '@angular/core';
// @ts-ignore
import Peer from 'peerjs';
import {environment} from '../../environments/environment';
import {GameState} from './game-state.enum';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameHostService {

  // Peer connection object
  private peer: Peer;
  private actionListeners = [];
  private connections = Array<Peer.DataConnection>();

  private gameState: GameState;

  private playerState = {
    1: null,
    2: null
  };

  constructor() {
    this.createGame();
  }

  public createGame() {
    this.gameState = GameState.Lobby;
    this.peer = new Peer(environment.peerserver.id, {
      host: environment.peerserver.host,
      port: environment.peerserver.port,
      key: environment.peerserver.key
    });
    this.initWebRTCListeners();
  }

  private initWebRTCListeners() {
    this.peer.on('connection', (conn) => {
      this.assignPlayer(conn);
    });
  }

  private attachListenersToConnection(conn: Peer.DataConnection) {
    conn.on('open', () => {
      this.assignPlayer(conn);
    });

    conn.on('close', () => {
      this.unassignPlayer(conn);
    });

    conn.on('data', (data) => {
      this.actionListeners.forEach( (actionHandler) => {
        if (data.type === 'action') {
          actionHandler(data);
        }
      });
    });
  }

  public isFull() {
    return this.connections[1] !== null && this.connections[2] !== null;
  }

  private unassignPlayer(conn: Peer.DataConnection) {

  }

  private assignPlayer(conn: Peer.DataConnection) {

  }

  public changeState(state: GameState) {
    if (state === GameState.Lobby) {

    } else if (state === GameState.Countdown) {

    } else if (state === GameState.InGame) {

    } else if (state === GameState.Pause) {

    } else {
      // state == ended
    }
  }

  public fromEvent(eventName) {
    return new Observable((observer) => {
      const handler = (e) => {
        observer.next(e);
      };

      if (eventName === 'action') {
        this.actionListeners.push(handler);
      }
      return () => {};
    });
  }
}
