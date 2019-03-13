import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Room} from './room';

@Injectable({
  providedIn: 'root'
})
export class WizardAPIService {

  private endpoint = environment.backend;

  constructor(
    private http: HttpClient
  ) { }

  public getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.endpoint + 'rooms');
  }

  public createRoom(hostid: string) {
    return this.http.post(this.endpoint + 'rooms', {hostid: hostid});
  }
}
