/* tslint:disable:no-unused-expression */
import {Injectable} from '@angular/core';
// @ts-ignore
import Peer from 'peerjs';
import {environment} from '../../environments/environment';
import {GameState} from './game-state.enum';
import {Subject} from 'rxjs';
import {RoomService} from '../external/room.service';

@Injectable({
  providedIn: 'root'
})
export class GameHostService {

  // Peer connection object
  private peer: Peer;

  public gameName;

  public peerId: string;

  private connections;

  public playerNames;

  // public startTime;

  public gameState: GameState;

  public events = new Emitter();

  constructor(private roomService: RoomService) {
    this.reset();
    this.peer = null;
    roomService.gameRoomId = null;
    this.gameName = null;
  }

  public createGame(): void {
    this.gameState = GameState.Lobby;
    this.peer = new Peer(environment.peerserver);
    this.initWebRTCListeners();
    this.peer.on('open', (hostId) => {
      this.roomService.createRoom(hostId).subscribe((data) => {
        // returns {'my_room_id': room_id, 'delete_password': password}
        this.roomService.gameRoomId = data['my_room_id'];
        this.roomService.setDeletePassword(data['delete_password']);
      });
    });
  }

  private initWebRTCListeners(): void {
    this.peer.on('connection', (conn) => {
      this.assignPlayer(conn);
    });
  }

  private attachListenersToConnection(conn: Peer.DataConnection, playerId: number): void {
    conn.on('open', () => {
      conn.send({type: 'setPlayerId', playerId: playerId});
    });

    conn.on('close', () => {
      this.unassignPlayer(conn);
    });

    conn.on('data', (data) => {
      if (data.type === 'action') {
        this.events.emit('action', data);
      } else if (data.type === 'getPlayerId') {
        conn.send({type: 'setPlayerId', playerId: playerId});
      }
    });
  }

  private unassignPlayer(conn: Peer.DataConnection): void {
    conn.close();
    if (this.connections[1] && this.connections[1].peer === conn.peer) {
      this.connections[1] = null;
      this.notifyPlayerHasLeft(1);
    } else if (this.connections[2] && this.connections[2].peer === conn.peer) {
      this.connections[2] = null;
      this.notifyPlayerHasLeft(2);
    }
  }

  public notifyPlayerHasJoined(playerId: number): void {
    // Update player's name - default to harry
    this.playerNames[playerId] = this.connections[playerId].metadata['name'] || 'Harry';

    // send another setPlayerId packet just in case...
    this.connections[playerId].send({type: 'setPlayerId', playerId: playerId});
    this.events.emit('join', playerId);
  }

  public notifyPlayerHasLeft(playerId: number): void {
    this.events.emit('left', playerId);
  }

  public tellPlayerIsReady(playerId: number) {
    this.connections[playerId].send({type: 'ready'});
  }

  private assignPlayer(conn: Peer.DataConnection): void {
    if (this.connections[1] == null) {
      this.connections[1] = conn;
      this.attachListenersToConnection(conn, 1);
      this.notifyPlayerHasJoined(1);
      conn.send({type: 'setPlayerId', playerId: 1});
    } else if (this.connections[2] == null) {
      this.connections[2] = conn;
      this.attachListenersToConnection(conn, 2);
      this.notifyPlayerHasJoined(2);
      conn.send({type: 'setPlayerId', playerId: 2});
    } else {
      conn.send({type: 'error', msg: 'room full'});
      return;
    }

    if (this.connections[1] && this.connections[2] && this.gameState === GameState.Lobby) {
      this.changeState(GameState.Countdown);
    }
  }

  public changeState(state: GameState): void {
    this.gameState = state;
  }

  public hostingGame(): boolean {
    return this.peer !== null && this.gameName !== null;
  }

  public sendGameStats(player: number, fastest_game: number,
                       most_damage: number, most_damage_blocked: number) {
    const conn = this.connections[player + 1];
    conn.send({
      type: 'gamestats', fastest_game: fastest_game,
      most_damage: most_damage, most_damage_blocked: most_damage_blocked
    });
  }

  public reset() {
    this.connections = {
      1: null,
      2: null
    };
    this.playerNames = {
      1: null,
      2: null
    };
  }
}

class Emitter {
  private subjects;

  constructor() {
    this.subjects = {};
  }

  private createName(name) {
    return '$' + name;
  }

  public emit(name, data) {
    const fnName = this.createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Subject());
    this.subjects[fnName].next(data);
  }

  public listen(name, handler) {
    const fnName = this.createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Subject());
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
