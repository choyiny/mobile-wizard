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

  constructor() {

  }

  // Peer connection object
  private peer: Peer = null;
  private connections = {
    1: null,
    2: null
  };

  public playerNames = {
    1: null,
    2: null
  };

  // public startTime;

  public gameState: GameState;

  private actionListeners = [];
  private joinListeners = [];
  private leftListeners = [];


  public createGame(gameId: string) {
    this.gameState = GameState.Lobby;
    this.peer = new Peer(gameId, environment.peerserver);
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
      this.playerNames[playerId] = conn.metadata['name'];
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

  private unassignPlayer(conn: Peer.DataConnection) {
    conn.close();
    if (this.connections[1] && this.connections[1].peer === conn.peer) {
      this.connections[1] = null;
      this.notifyPlayerHasLeft(1);
    } else if (this.connections[2] && this.connections[2].peer === conn.peer) {
      this.connections[2] = null;
      this.notifyPlayerHasLeft(2);
    }
  }

  public notifyPlayerHasJoined(playerId: number) {
    this.joinListeners.forEach((joinHandler) => {
      joinHandler(playerId);
    });
  }

  public notifyPlayerHasLeft(playerId: number) {
    this.leftListeners.forEach((joinHandler) => {
      joinHandler(playerId);
    });
  }

  private assignPlayer(conn: Peer.DataConnection) {
    if (this.connections[1] === null) {
      this.connections[1] = conn;
      this.attachListenersToConnection(conn, 1);
      this.notifyPlayerHasJoined(1);
      console.log('assigned player 1');
      conn.send({type: 'setPlayerId', playerId: 1});
    } else if (this.connections[2] === null) {
      this.connections[2] = conn;
      this.attachListenersToConnection(conn, 2);
      this.notifyPlayerHasJoined(2);
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

  public gotoCountdown() {

  }

  public changeState(state: GameState) {
    this.gameState = state;
  }

  public fromEvent(eventName) {
    return new Observable((observer) => {
      const handler = (e) => {
        observer.next(e);
      };
      if (eventName === 'action') {
        this.actionListeners.push(handler);
      } else if (eventName === 'join') {
        this.joinListeners.push(handler);
      } else if (eventName === 'left') {
        this.leftListeners.push(handler);
      }

      return () => {};
    });
  }

  public hostingGame(): boolean {
    return this.peer !== null;
  }

  public sendGameStats(player: number, fastest_game: number,
                       most_damage: number, most_damage_blocked: number) {
    const conn = this.connections[player + 1];
    conn.send({type: 'gamestats', fastest_game:　fastest_game,
      most_damage:　most_damage, most_damage_blocked: most_damage_blocked});
    console.log('Stats sent to Player ' + (player + 1));
  }
}
