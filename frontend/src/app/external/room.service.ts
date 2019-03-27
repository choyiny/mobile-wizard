import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private endpoint = environment.backend;

  private password;

  public gameRoomId;

  constructor(private http: HttpClient) {
    this.password = '';
  }

  getRoom(roomId: string): Observable<object> {
    if (roomId) {
      return this.http.get(`${this.endpoint}/rooms/${roomId}`);
    } else {
      return null;
    }
  }

  deleteRoom(): Observable<object> {
    if (this.gameRoomId) {
      return this.http.delete(`${this.endpoint}/rooms/${this.gameRoomId}`, {headers: {'Authorization': `Bearer ${this.password}`}});
    }
  }

  createRoom(hostId: string): Observable<object> {
    return this.http.post(`${this.endpoint}/rooms`, {id: hostId});
  }

  setDeletePassword(password: string) {
    this.password = password;
  }
}
