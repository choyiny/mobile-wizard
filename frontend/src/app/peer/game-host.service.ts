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
  private connections = {
    1: null,
    2: null
  };

  private gameState: GameState;

  private playerState = {
    1: null,
    2: null
  };

  constructor() {

  }

  public createGame(gameId: string) {
    this.gameState = GameState.Lobby;
    this.peer = new Peer(gameId, {
      host: environment.peerserver.host,
      port: environment.peerserver.port,
      key: environment.peerserver.key
    });
    console.log(this.peer);
    this.initWebRTCListeners();
  }

  private initWebRTCListeners() {
    this.peer.on('connection', (conn) => {
      this.assignPlayer(conn);
    });
  }

  private attachListenersToConnection(conn: Peer.DataConnection, playerId: number) {
    conn.on('open', () => {
      conn.send({type: 'setPlayerId', playerId: playerId});
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
    if (this.connections[1] === conn) {
      this.connections[1] = null;
    } else if (this.connections[2] === conn) {
      this.connections[2] = null;
    }
  }

  private assignPlayer(conn: Peer.DataConnection) {
    if (this.connections[1] === null) {
      this.connections[1] = conn;
      this.attachListenersToConnection(conn, 1);
      console.log('assigned player 1');
    } else if (this.connections[2] === null) {
      this.connections[2] = conn;
      this.attachListenersToConnection(conn, 2);
      console.log('assigned player 2');
      conn.send({type: 'setPlayerId', playerId: 2});
    } else {
      console.log('full');
      conn.send({type: 'error', msg: 'room full'});
      // conn.close();
      return;
    }

    if (this.connections[1] && this.connections[2] && this.gameState === GameState.Lobby) {
      this.changeState(GameState.Countdown);
    }
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
