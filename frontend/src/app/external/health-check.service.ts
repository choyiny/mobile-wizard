import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {

  private apiEndpoint = environment.backend;
  private peerEndpoint = 'https://' + environment.peerserver.host;

  constructor(private http: HttpClient) { }

  getApiStatus(): Observable<boolean> {
    return this.http.get(this.apiEndpoint).pipe(
      map(data => {
        return data['status'];
      })
    );
  }

  getPeerServerStatus(): Observable<boolean> {
    return this.http.get(this.peerEndpoint).pipe(
      map((data) => {
        return data['name'].length > 0;
      })
    );
  }

}
